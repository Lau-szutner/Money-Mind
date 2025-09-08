import { Category } from '../models/index.js';

async function categoriesSeeder() {
  try {
    await Category.bulkCreate([
      {
        title: 'Salary',
      },
      {
        title: 'Grocery',
      },
      {
        title: 'Entertainment',
      },
      {
        title: 'Freelance',
      },
      {
        title: 'Health',
      },
      {
        title: 'Books',
      },
      {
        title: 'Sports',
      },
      {
        title: 'Tech',
      },
      {
        title: 'Taxes',
      },
      {
        title: 'Food',
      },
      {
        title: 'Bonus',
      },
    ]);
    console.log('Categories inserted');
  } catch (error) {
    console.log('❌ Error inserting categories:', error);
  }
}
categoriesSeeder();
