import connection from '../config/database.js';

export async function doLoginModel(email, password) {
  try {
    const [result] = await connection.query(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, password]
    );
    return result;
  } catch (error) {
    throw new Error('Error al recuperar el usuario: ' + error.message);
  }
}
