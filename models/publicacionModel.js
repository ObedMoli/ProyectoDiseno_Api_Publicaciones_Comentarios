import db from '../config/db.js';

export const obtenerPublicaciones = async () => {
  const [rows] = await db.execute(`
    SELECT 
      p.post_id,
      p.title,
      p.content_line1,
      p.content_line2,
      p.image,
      p.date,
      u.name AS autor,
      c.category_title AS categoria
    FROM post p
    JOIN user u ON p.user_user_id = u.user_id
    LEFT JOIN category c ON p.category_category_id = c.category_id
    ORDER BY p.date DESC
  `);
  return rows;
};

export const crearPublicacion = async (post) => {
  const { title, content_line1, content_line2, image, category_category_id, user_user_id } = post;

  const query = `
    INSERT INTO post (title, content_line1, content_line2, image, category_category_id, user_user_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    title,
    content_line1,
    content_line2 || null,
    image || null,
    category_category_id,
    user_user_id
  ];

  await db.execute(query, values);
};

export const obtenerPublicacionPorId = async (id) => {
  const [rows] = await db.execute(`
    SELECT 
      p.post_id,
      p.title,
      p.content_line1,
      p.content_line2,
      p.image,
      p.date,
      u.name AS autor,
      c.category_title AS categoria
    FROM post p
    JOIN user u ON p.user_user_id = u.user_id
    LEFT JOIN category c ON p.category_category_id = c.category_id
    WHERE p.post_id = ?
  `, [id]);

  return rows[0]; // Devuelve un solo objeto o undefined
};
