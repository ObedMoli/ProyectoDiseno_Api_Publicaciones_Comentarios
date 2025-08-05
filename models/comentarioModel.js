import pool from '../config/db.js';

export const getComentariosByPostId = async (postId) => {
  const [rows] = await pool.query(
    'SELECT * FROM comment WHERE post_post_id = ? ORDER BY date DESC',
    [postId]
  );
  return rows;
};
