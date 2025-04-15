import Transaction from '../models/Transaction.js';
import User from '../models/User.js';

async function seedTransactions() {
  try {
    // 🔍 Buscar el usuario 'root' en la base de datos
    const rootUser = await User.findOne({ where: { email: 'root@gmail.com' } });
    const lautaroUser = await User.findOne({
      where: { email: 'lautaroszutner@gmail.com' },
    });

    if (!rootUser) {
      console.error('❌ No se encontró el usuario root.');
      return;
    }

    function formatDate(dateString) {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        console.error(`Fecha inválida: ${dateString}`);
        return new Date().toISOString().slice(0, 19).replace('T', ' '); // Usa la fecha actual como fallback
      }
      return date.toISOString().slice(0, 19).replace('T', ' ');
    }
    const transactions = [
      // Transacciones del rootUser
      {
        title: 'Fruits',
        description: 'banana, manzana',
        category: 'grocery',
        photo: null,
        date: formatDate('2025-12-12'),
        type: 'expense',
        amount: 30,
        fk_user_id: rootUser.id,
      },
      {
        title: 'Salary',
        description: 'monthly salary',
        category: 'salary',
        photo: null,
        date: formatDate('2025-12-12'),
        type: 'income',
        amount: 1200,
        fk_user_id: rootUser.id,
      },
      {
        title: 'Netflix Subscription',
        description: 'Monthly payment',
        category: 'entertainment',
        photo: null,
        date: formatDate('2025-12-12'),
        type: 'expense',
        amount: 15,
        fk_user_id: rootUser.id,
      },
      {
        title: 'Freelance Project',
        description: 'Website design for client',
        category: 'freelance',
        photo: null,
        date: formatDate('2025-12-12'),
        type: 'income',
        amount: 500,
        fk_user_id: rootUser.id,
      },
      {
        title: 'Gym Membership',
        description: 'Monthly gym fee',
        category: 'health',
        photo: null,
        date: formatDate('2025-12-12'),
        type: 'expense',
        amount: 40,
        fk_user_id: rootUser.id,
      },
      {
        title: '1984 book',
        description: '1984',
        category: 'Books',
        photo: null,
        date: formatDate('2025-12-12'),
        type: 'expense',
        amount: 40,
        fk_user_id: rootUser.id,
      },
      {
        title: 'Ski clases',
        description: 'Sky clases',
        category: 'Sports',
        photo: null,
        date: formatDate('2025-12-12'),
        type: 'income',
        amount: 100,
        fk_user_id: rootUser.id,
      },

      // Transacciones del lautaroUser
      {
        title: 'New phone',
        description: 'Iphone 18',
        category: 'tech',
        photo: null,
        date: formatDate('2025-12-12'),
        type: 'expense',
        amount: 999,
        fk_user_id: lautaroUser.id,
      },
      {
        title: 'Salary',
        description: 'monthly salary',
        category: 'salary',
        photo: null,
        date: formatDate('2025-12-12'),
        type: 'income',
        amount: 2500,
        fk_user_id: lautaroUser.id,
      },
      {
        title: 'Taxes',
        description: 'Taxes from 2025',
        category: 'taxes',
        photo: null,
        date: formatDate('2025-12-12'),
        type: 'expense',
        amount: 300,
        fk_user_id: lautaroUser.id,
      },
      {
        title: 'Coffee Shop',
        description: 'Starbucks breakfast',
        category: 'food',
        photo: null,
        date: formatDate('2025-12-12'),
        type: 'expense',
        amount: 12,
        fk_user_id: lautaroUser.id,
      },
      {
        title: 'Bonus',
        description: 'Performance bonus',
        category: 'bonus',
        photo: null,
        date: formatDate('2025-12-12'),
        type: 'income',
        amount: 600,
        fk_user_id: lautaroUser.id,
      },
    ];

    await Transaction.bulkCreate(transactions, { validate: true });

    console.log('✔ Transacciones insertadas correctamente.');
  } catch (error) {
    console.error('❌ Error insertando transacciones:', error);
  }
}

seedTransactions();
