import { obtenerPublicaciones } from '../models/publicacionModel.js';
import { ok, internalError,created, badRequest, notFound,forbidden } from '../utils/utils.js';
import { publicacionSchema } from '../schemas/validatorsPublicacion.js';
import { actualizarPublicacion, obtenerPublicacionConAutor,eliminarPublicacionYComentarios,obtenerPublicacionPorId,crearPublicacion,obtenerCategorias, obtenerPublicacionesPaginadas} from '../models/publicacionModel.js';
import { getComentariosByPostId } from '../models/comentarioModel.js';
// Controlador para manejar las publicaciones
// Obtiene todas las publicaciones
// No requiere autenticación
export const getPublicaciones = async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    const category = (req.query.category || '').trim(); // por nombre de categoría
    const page = Math.max(1, parseInt(req.query.page || '1', 10));
    const pageSize = Math.min(50, Math.max(1, parseInt(req.query.pageSize || '10', 10)));

    const { items, total } = await obtenerPublicacionesPaginadas({ q, category, page, pageSize });
    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    return res.status(200).json(ok('Lista de publicaciones', {
      items,
      page,
      pageSize,
      total,
      totalPages
    }));
  } catch (e) {
    console.error('Error al obtener publicaciones:', e);
    return res.status(500).json(internalError('Error al obtener publicaciones', e.message));
  }
};

// Crea una nueva publicación
// Requiere autenticación (verifyToken)
export const postPublicacion = async (req, res) => {
  try {
    const parsed = publicacionSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(badRequest('Datos inválidos', parsed.error.errors));
    }

    const data = parsed.data; // content_line2 e image ya vienen en null si estaban vacíos

    await crearPublicacion({
      ...data,
      user_user_id: Buffer.from(req.user.user_id, 'hex'),
    });

    return res.status(201).json(created('Publicación creada exitosamente'));
  } catch (error) {
    console.error(error);
    return res.status(500).json(internalError('Error al crear la publicación', error.message));
  }
};


// Obtiene una publicación por ID
// No requiere autenticación
// Devuelve 404 si no existe
// Devuelve 400 si el ID es inválido
export const getPublicacionPorId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json(badRequest('ID inválido'));
    }

    const publicacion = await obtenerPublicacionPorId(id);
    if (!publicacion) {
      return res.status(404).json(notFound('Publicación no encontrada'));
    }

    // Obtener comentarios relacionados
    const comentarios = await getComentariosByPostId(id);

    // Agregar comentarios al objeto publicación
    publicacion.comentarios = comentarios;

    return res.status(200).json(ok('Publicación encontrada', publicacion));
  } catch (error) {
    console.error('Error al obtener publicación por ID:', error);
    return res.status(500).json(internalError('Error del servidor', error.message));
  }
};

// Actualiza una publicación por ID
// Requiere autenticación (verifyToken)
// Devuelve 404 si no existe
export const putPublicacion = async (req, res) => {
  try {
    const post_id = Number.parseInt(req.params.id, 10);
    if (Number.isNaN(post_id)) {
      return res.status(400).json(badRequest('ID inválido'));
    }

    const parsed = publicacionSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(badRequest('Datos inválidos', parsed.error.errors));
    }

    const publicacion = await obtenerPublicacionConAutor(post_id);
    if (!publicacion) {
      return res.status(404).json(notFound('Publicación no encontrada'));
    }

    const autorBinario = publicacion.user_user_id;
    const usuarioSolicitante = req.user.user_id_bin;
    if (!autorBinario.equals(usuarioSolicitante)) {
      return res.status(403).json(forbidden('No tienes permiso para editar esta publicación'));
    }

    await actualizarPublicacion(post_id, parsed.data); // image/content_line2 ya normalizados
    return res.status(200).json(ok('Publicación actualizada exitosamente'));
  } catch (error) {
    console.error('Error al actualizar publicación:', error);
    return res.status(500).json(internalError('Error del servidor', error.message));
  }
};



// Elimina una publicación por ID
// Requiere autenticación (verifyToken)
// Devuelve 404 si no existe
export const deletePublicacion = async (req, res) => {
  try {
    const post_id = parseInt(req.params.id, 10);
    if (Number.isNaN(post_id)) {
      return res.status(400).json(badRequest('ID inválido'));
    }

    const pub = await obtenerPublicacionConAutor(post_id);
    if (!pub) {
      return res.status(404).json(notFound('Publicación no encontrada'));
    }

    // Verifica que el autor (BINARY) sea el mismo que el usuario autenticado
    const autorBin = pub.user_user_id;              // BINARY(16) desde DB
    const solicitanteBin = req.user.user_id_bin;    // BINARY(16) desde verifyToken

    if (!autorBin.equals(solicitanteBin)) {
      return res.status(403).json(forbidden('No tienes permiso para eliminar esta publicación'));
    }

    const affected = await eliminarPublicacionYComentarios(post_id);
    if (affected === 0) {
      return res.status(404).json(notFound('Publicación no encontrada'));
    }

    return res.status(200).json(ok('Publicación eliminada correctamente'));
  } catch (error) {
    console.error('Error al eliminar publicación:', error);
    return res.status(500).json(internalError('Error del servidor', error.message));
  }
};

// Obtiene todas las categorías disponibles
// No requiere autenticación
export const getCategorias = async (req, res) => {
  try {
    const cats = await obtenerCategorias();
    return res.status(200).json(ok('Lista de categorías', cats));
  } catch (e) {
    console.error('Error al obtener categorías:', e);
    return res.status(500).json(internalError('Error al obtener categorías', e.message));
  }
};