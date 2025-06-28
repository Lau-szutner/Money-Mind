import { Course } from '../models/index.js';

async function coursesSeeder() {
  try {
    await Course.bulkCreate([
      {
        title: 'Monthly Budget',
        author: 'Sarah Thompson',
        description:
          'Learn how to take control of your personal finances with practical budgeting techniques. This course provides step-by-step guidance to track your expenses, reduce unnecessary costs.',
        price: 1,
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
