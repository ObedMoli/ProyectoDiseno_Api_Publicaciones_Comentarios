import db from '../config/db.js';


const obtenerCategoryIdPorNombre = async (nombre) => {
  const [rows] = await db.execute(
    'SELECT category_id FROM category WHERE category_title = ?',
    [nombre]
  );
  return rows.length ? rows[0].category_id : null;
};

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
  const { title, content_line1, content_line2, image, category_title, user_user_id } = post;

  // Convertir nombre a ID
  const categoryId = await obtenerCategoryIdPorNombre(category_title);
  if (!categoryId) {
    throw new Error(`La categoría '${category_title}' no existe`);
  }

  const query = `
    INSERT INTO post (title, content_line1, content_line2, image, category_category_id, user_user_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    title,
    content_line1,
    content_line2 || null,
    image || null,
    categoryId,
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
export const obtenerPublicacionConAutor = async (post_id) => {
  const [rows] = await db.execute(`
    SELECT user_user_id FROM post WHERE post_id = ?
  `, [post_id]);
  return rows[0];
};

export const actualizarPublicacion = async (post_id, data) => {
  const { title, content_line1, content_line2, image, category_title } = data;

  // Convertir nombre a ID
  const categoryId = await obtenerCategoryIdPorNombre(category_title);
  if (!categoryId) {
    throw new Error(`La categoría '${category_title}' no existe`);
  }

  await db.execute(`
    UPDATE post 
    SET title = ?, content_line1 = ?, content_line2 = ?, image = ?, category_category_id = ?
    WHERE post_id = ?
  `, [
    title,
    content_line1,
    content_line2 || null,
    image || null,
    categoryId,
    post_id
  ]);
};



// Eliminar publicación (y sus comentarios primero para no romper FK)
export const eliminarPublicacionYComentarios = async (post_id) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    await conn.execute('DELETE FROM comment WHERE post_post_id = ?', [post_id]);
    const [result] = await conn.execute('DELETE FROM post WHERE post_id = ?', [post_id]);

    await conn.commit();
    return result.affectedRows; // 1 si eliminó, 0 si no existía
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};
