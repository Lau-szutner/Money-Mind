// scripts/seed.js
import connection from '../config/database.js';
import { createUserModel } from '../models/createUserModel.js';

async function seedDatabase() {
  try {
    console.log('Conectado a la base de datos.');

    // Eliminar datos antiguos (opcional)
    await connection.query('DELETE FROM users');
    console.log('Datos antiguos eliminados.');

    // Inserta datos de prueba
    const users = [
      {
        email: 'root@gmail.com',
        name: 'root',
        password: 'root',
      },
      {
        email: 'prueba@example.com',
        name: 'Usuario Prueba',
        password: 'password456',
      },
    ];

    for (const user of users) {
      await createUserModel(user.name, user.email, user.password);
    }
    console.log('Datos insertados correctamente.');

    // Cierra la conexión
    process.exit();
  } catch (error) {
    console.error('Error al sembrar la base de datos:', error);
    process.exit(1);
  }
}

// Ejecuta la función al correr el script
seedDatabase();
