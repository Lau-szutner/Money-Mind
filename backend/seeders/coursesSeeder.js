import { Course } from '../models/index.js';

async function coursesSeeder() {
  try {
    await Course.bulkCreate([
      {
        title: 'hello',
        author: 'none',
        description: 'ffff',
        price: 12,
      },
      {
        title: 'Curso avanzado',
        author: 'Jane Doe',
        description: 'Un curso avanzado de ejemplo',
        price: 25.5,
      },
    ]);
    console.log('✅ Cursos insertados correctamente');
  } catch (error) {
    console.error('❌ Error insertando cursos:', error);
  }
}

coursesSeeder();
