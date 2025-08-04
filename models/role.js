import db from '../config/db.js';

export const obtenerRoles = async () => {
  const [rows] = await db.execute('SELECT * FROM role');
  return rows;
};