import connection from '../config/database.js';

export async function createUser(name, email, password) {
  try {
    const [result] = await connection.query(
      'INSERT INTO users (name, email, password, register_date) VALUES (?, ?, ?, NOW())',
      [name, email, password]
    );
    return result; // Devuelve el resultado con el insertId
  } catch (error) {
    throw new Error('Error al crear el usuario: ' + error.message);
  }
}

export async function findById(id) {
  try {
    const [rows] = await connection.query(
      'SELECT * FROM users WHERE id_users = ?',
      [id]
    );
    return rows[0];
  } catch (error) {
    throw new Error('Error al buscar el usuario: ' + error.message);
  }
}

export async function getAll() {
  try {
    const [rows] = await connection.query('SELECT * FROM users');
    return rows;
  } catch (error) {
    throw new Error('Error al obtener los usuarios: ' + error.message);
  }
}
