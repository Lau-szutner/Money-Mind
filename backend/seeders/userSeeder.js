import bcrypt from 'bcrypt';
import User from '../models/User.js';

async function seedUsers() {
  try {
    // Hashear la contraseña antes de insertar en la BD
    const hashedPassword = await bcrypt.hash('root', 10); // 10 es el "saltRounds"

    await User.bulkCreate(
      [
        {
          name: 'root',
          email: 'root@gmail.com',
          password: hashedPassword, // Guardamos la versión hasheada
        },
      ],
      {
        validate: true, // Opcional: valida los datos según las reglas del modelo
      }
    );

    console.log(
      '✔ Usuario root insertado correctamente con contraseña hasheada'
    );
  } catch (error) {
    console.error('❌ Error insertando usuarios:', error);
  }
}

seedUsers();
