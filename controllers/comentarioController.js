import {
  getTodosLosComentarios,
  getComentariosByPostId,
  crearComentario
} from '../models/comentarioModel.js';

export const obtenerTodosLosComentarios = async (req, res) => {
  try {
    const comentarios = await getTodosLosComentarios();
    res.json(comentarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener todos los comentarios' });
  }
};

export const obtenerComentarios = async (req, res) => {
  const postId = req.params.id;

  try {
    const comentarios = await getComentariosByPostId(postId);
    res.json(comentarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener comentarios de la publicación' });
  }
};

export const publicarComentario = async (req, res) => {
  try {
    const postId = Number(req.params.id);
    if (!Number.isInteger(postId)) {
      return res.status(400).json({ message: 'ID de publicación inválido' });
    }

    const { content } = req.validated || {};
    if (!content || content.trim() === '') {
      return res.status(400).json({ message: 'El contenido del comentario es obligatorio' });
    }

    const userIdBin = req.user?.user_id_bin;
    const userName = req.user?.name || 'Usuario';

    const comentario = {
      comment_by_user_name: userName,
      content,
      post_post_id: postId,
      user_user_id: userIdBin
    };

    await crearComentario(comentario);
    return res.status(201).json({ message: 'Comentario creado correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al publicar comentario' });
  }
};
