import { obtenerPublicaciones } from '../models/publicacionModel.js';
import { ok, internalError,created, badRequest, notFound } from '../utils/utils.js';
import { publicacionSchema } from '../schemas/validatorsPublicacion.js';
import { crearPublicacion } from '../models/publicacionModel.js';
import { obtenerPublicacionPorId } from '../models/publicacionModel.js';

export const getPublicaciones = async (req, res) => {
  try {
    const publicaciones = await obtenerPublicaciones();
    return res.status(200).json(ok('Lista de publicaciones', publicaciones));
  } catch (error) {
    console.error('Error al obtener publicaciones:', error);
    return res.status(500).json(internalError('Error al obtener publicaciones', error.message));
  }
};
export const postPublicacion = async (req, res) => {
  try {
    const parsed = publicacionSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json(badRequest('Datos inválidos', parsed.error.flatten()));
    }

    const data = parsed.data;

    await crearPublicacion({
      ...data,
      user_user_id: Buffer.from(req.user.user_id, 'hex') // UUID binario
    });

    return res.status(201).json(created('Publicación creada exitosamente'));

  } catch (error) {
    console.error(error);
    return res.status(500).json(internalError('Error al crear la publicación', error.message));
  }
};
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

    return res.status(200).json(ok('Publicación encontrada', publicacion));
  } catch (error) {
    console.error('Error al obtener publicación por ID:', error);
    return res.status(500).json(internalError('Error del servidor', error.message));
  }
};