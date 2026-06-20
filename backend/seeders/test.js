import { Course, User } from '../models/index.js';

async function test() {
  try {
    // Traemos instructores existentes para no hardcodear IDs a ciegas.
    // Ajustá el criterio de búsqueda según cómo identifiques instructores en tu tabla de users.
    const root = await User.findOne({
      where: { email: 'root@gmail.com' },
    });
    const lautaro = await User.findOne({
      where: { email: 'lautaroszutner@gmail.com' },
    });
    const admin = await User.findOne({
      where: { email: 'admin@gmail.com' },
    });

    if (!root || !lautaro || !admin) {
      throw new Error(
        'Faltan instructores en la base. Corré el seeder de usuarios primero.',
      );
    }

    console.log(root.id);
  } catch (error) {
    console.error('❌ Error insertando cursos:', error);
  }
}

test();
