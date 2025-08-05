import pool from '../config/db.js';

export const getTodosLosComentarios = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM comment ORDER BY date DESC'
  );
  return rows;
};

export const getComentariosByPostId = async (postId) => {
  const [rows] = await pool.query(
    'SELECT * FROM comment WHERE post_post_id = ? ORDER BY date DESC',
    [postId]
  );
  return rows;
};

export const crearComentario = async (comentario) => {
  const { comment_by_user_name, content, post_post_id, user_user_id } = comentario;
  await pool.query(
    'INSERT INTO comment (comment_by_user_name, content, post_post_id, user_user_id) VALUES (?, ?, ?, UUID_TO_BIN(?))',
    [comment_by_user_name, content, post_post_id, user_user_id]
    );
};
