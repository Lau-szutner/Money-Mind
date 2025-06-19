import bcrypt from 'bcrypt';
import { User } from '../models/index.js';

async function seedUsers() {
  try {
    const users = [
      {
        name: 'root',
        email: 'root@gmail.com',
        password: 'root',
      },
      {
        name: 'lautaro',
        email: 'lautaroszutner@gmail.com',
        password: 'lautaro123',
      },
      {
        name: 'admin',
        email: 'admin@gmail.com',
        password: 'admin123',
      },
    ];

    // Hashear contraseñas una por una
    for (const user of users) {
      user.password = await bcrypt.hash(user.password, 10);
    }

    await User.bulkCreate(users, { validate: true });

    console.log(
      '✔ Usuarios insertados correctamente con contraseñas hasheadas'
    );
  } catch (error) {
    console.error('❌ Error insertando usuarios:', error);
  }
}

seedUsers();
