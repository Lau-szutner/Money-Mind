import connection from '../config/database.js';
import bcrypt from 'bcrypt'; // Asegúrate de importar bcrypt

export async function doLoginModel(email, password) {
  try {
    // Obtiene el usuario con el email proporcionado
    const [results] = await connection.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (results.length === 0) {
      throw new Error('Usuario no encontrado');
    }

    // Compara la contraseña proporcionada con el hash de la base de datos
    const user = results[0]; // Asumimos que solo habrá un usuario con ese email

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Contraseña incorrecta');
    }

    return user; // Retorna el usuario si la contraseña es correcta
  } catch (error) {
    throw new Error('Error al recuperar el usuario: ' + error.message);
  }
}
