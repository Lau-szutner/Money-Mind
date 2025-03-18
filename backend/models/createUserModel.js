import connection from '../config/database.js';

export async function createUserModel(email, name, password) {
  try {
    const [result] = await connection.query(
      'INSERT INTO users (email, name, password) VALUES (?, ?, ?)',
      [email, name, password]
    );
    return result;
  } catch (error) {
    throw new Error('Error al crear el usuario: ' + error.message);
  }
}
