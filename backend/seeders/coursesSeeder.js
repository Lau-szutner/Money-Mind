import { Course } from '../models/index.js';

async function coursesSeeder() {
  try {
    await Course.bulkCreate([
      {
        title: 'Monthly Budget',
        author: 'Sarah Thompson',
        description:
          'Learn how to take control of your personal finances with practical budgeting techniques. This course provides step-by-step guidance to track your expenses, reduce unnecessary costs.',
        price: 19.99,
      },
      {
        title: 'Big Goals Without Stress',
        author: 'David R. Morales',
        description:
          "Whether you're saving for a car, vacation, or emergency fund, this course will help you build a personalized saving strategy. Understand short vs long-term goals, automate savings",
        price: 25.5,
      },
      {
        title: 'Credit Cards',
        author: 'Michelle K. Reeves',
        description:
          'Discover how to use credit cards responsibly, avoid common traps, and increase your credit score. This course explains how interest, limits, and credit history work',
        price: 12.5,
      },
      {
        title: 'Big Goals Without Stress',
        author: 'David R. Morales',
        description:
          "Whether you're saving for a car, vacation, or emergency fund, this course will help you build a personalized saving strategy. Understand short vs long-term goals, automate savings",
        price: 25.5,
      },
    ]);
    console.log('✅ Cursos insertados correctamente');
  } catch (error) {
    console.error('❌ Error insertando cursos:', error);
  }
}

coursesSeeder();
