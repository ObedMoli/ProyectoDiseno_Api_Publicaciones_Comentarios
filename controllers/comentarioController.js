import { getComentariosByPostId } from '../models/comentarioModel.js';

export const obtenerComentarios = async (req, res) => {
  const postId = req.params.id;

  try {
    const comentarios = await getComentariosByPostId(postId);
    res.json(comentarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener comentarios' });
  }
};
