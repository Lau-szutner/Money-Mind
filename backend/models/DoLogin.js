import bcrypt from 'bcrypt';
import User from '../models/User.js'; // Asegúrate de importar tu modelo User

export async function DoLogin(email, password) {
  try {
    // Busca el usuario por su email usando Sequelize
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('User not found.');
    }

    // Compara la contraseña proporcionada con el hash de la base de datos
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Incorrect password.');
    }

    return user; // Retorna el usuario si la contraseña es correcta
  } catch (error) {
    throw error;
  }
}
