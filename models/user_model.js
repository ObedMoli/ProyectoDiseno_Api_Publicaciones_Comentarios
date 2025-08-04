import pool from '../config/db.js';

export const getUserByEmail = async (email) => {
    const [rows] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);
    return rows[0];
};

export const getUserById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM user WHERE user_id = ?', [id]);
    return rows[0];
};

export const createUser = async (user) => {
    const { user_id, name, email, password_hash, telefono, about} =user;
    await pool.query(
        'INSERT INTO user (user_id, name, email, password_hash, telefono, about) VALUES (?, ?, ?, ?, ?, ?)',
        [user_id, name, email, password_hash, telefono, about]
    );
};

export const getRoleByName = async (role_name) => {
    const [rows] = await pool.query('SELECT * FROM role WHERE role_name = ?', [role_name]);
    return rows[0];
}

export const assingnUserRole = async (user_id, role_id) => {
    await pool.query(
        'INSERT INTO user_role (user, role) VALUES (?, ?)', [user_id, role_id]
    );
}