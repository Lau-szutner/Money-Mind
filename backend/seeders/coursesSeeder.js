import { Course, User } from '../models/index.js';

async function coursesSeeder() {
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

    await Course.bulkCreate([
      {
        title: 'Monthly Budget',
        slug: 'monthly-budget',
        fk_instructor_id: root.id,
        description:
          'Learn how to take control of your personal finances with practical budgeting techniques. This course provides step-by-step guidance to track your expenses, reduce unnecessary costs.',
        shortDescription:
          'Practical techniques to track expenses and reduce costs.',
        topics: ['Budgeting', 'Expense Tracking', 'Saving Habits'],
        isFree: true,
        price: 0,
        currency: 'USD',
        status: 'published',
        publishedAt: new Date(),
      },
      {
        title: 'Big Goals Without Stress',
        slug: 'big-goals-without-stress',
        fk_instructor_id: lautaro.id,
        description:
          "Whether you're saving for a car, vacation, or emergency fund, this course will help you build a personalized saving strategy. Understand short vs long-term goals, automate savings",
        shortDescription:
          'Build a personalized saving strategy for short and long-term goals.',
        topics: ['Goal Setting', 'Automated Savings', 'Emergency Fund'],
        isFree: true,
        price: 0,
        currency: 'USD',
        status: 'published',
        publishedAt: new Date(),
      },
      {
        title: 'Credit Cards',
        slug: 'credit-cards',
        fk_instructor_id: admin.id,
        description:
          'Discover how to use credit cards responsibly, avoid common traps, and increase your credit score. This course explains how interest, limits, and credit history work',
        shortDescription:
          'Use credit cards responsibly and improve your credit score.',
        topics: ['Credit Score', 'Interest Rates', 'Responsible Spending'],
        isFree: true,
        price: 0,
        currency: 'USD',
        status: 'published',
        publishedAt: new Date(),
      },
    ]);

    console.log('✔ Cursos insertados correctamente');
  } catch (error) {
    console.error('❌ Error insertando cursos:', error);
  }
}

coursesSeeder();
