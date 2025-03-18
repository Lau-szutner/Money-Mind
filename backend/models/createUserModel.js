import connection from '../config/database.js';

export async function createUserModel(email, name) {
  try {
    const [result] = await connection.query(
      'INSERT INTO users (email, name) VALUES (?, ?)',
      [email, name]
    );
    return result;
  } catch (error) {
    throw new Error('Error al crear el usuario: ' + error.message);
  }
}
