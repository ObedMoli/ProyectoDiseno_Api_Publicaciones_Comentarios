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
  const postId = req.params.id;
  const { content } = req.body;

  if (!content || content.trim() === '') {
    return res.status(400).json({ message: 'El contenido del comentario es obligatorio' });
  }

  try {
    const comentario = {
      comment_by_user_name: req.user.name,
      content: content.trim(),
      post_post_id: postId,
      user_user_id: req.user.user_id_bin
    };

    await crearComentario(comentario);
    res.status(201).json({ message: 'Comentario creado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al publicar comentario' });
  }
};
