import Transaction from '../models/Transaction.js';
import User from '../models/User.js';

async function seedTransactions() {
  try {
    // 🔍 Buscar el usuario 'root' en la base de datos
    const rootUser = await User.findOne({ where: { email: 'root@gmail.com' } });

    if (!rootUser) {
      console.error('❌ No se encontró el usuario root.');
      return;
    }

    const transactions = [
      {
        title: 'Fruits',
        description: 'banana, manzana',
        category: 'grocery',
        photo: null,
        date: '2001-11-01',
        type: 'expense',
        amount: 321,
        fk_user_id: rootUser.id, // 🔥 Usamos el ID real del usuario root
      },
    ];

    await Transaction.bulkCreate(transactions, { validate: true });

    console.log('✔ Transacciones insertadas correctamente.');
  } catch (error) {
    console.error('❌ Error insertando transacciones:', error);
  }
}

seedTransactions();
