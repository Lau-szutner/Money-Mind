import { Category } from '../models/index.js';

async function categoriesSeeder() {
  try {
    await Category.bulkCreate([
      {
        title: 'Salario',
      },
      {
        title: 'Supermercado',
      },
      {
        title: 'Entretenimiento',
      },
      {
        title: 'Freelance',
      },
      {
        title: 'Salud',
      },
      {
        title: 'Libros',
      },
      {
        title: 'Deportes',
      },
      {
        title: 'Tecnología',
      },
      {
        title: 'Impuestos',
      },
      {
        title: 'Comida',
      },
      {
        title: 'Bono',
      },
    ]);
    console.log('Categories inserted');
  } catch (error) {
    console.log('❌ Error inserting categories:', error);
  }
}
categoriesSeeder();
