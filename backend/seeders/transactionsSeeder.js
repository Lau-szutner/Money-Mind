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
      {
        title: 'Fruits',
        description: 'banana, manzana',
        category: 'grocery',
        photo: null,
        date: formatDate('2025-12-12'), // ✅ Convertido a formato correcto
        type: 'expense',
        amount: 321,
        fk_user_id: rootUser.id, // 🔥 Usamos el ID real del usuario root
      },
      {
        title: 'salary',
        description: 'my own job',
        category: 'salary',
        photo: null,
        date: formatDate('2025-12-12'), // ✅ Convertido a formato correcto
        type: 'income',
        amount: 100000,
        fk_user_id: rootUser.id, // 🔥 Usamos el ID real del usuario root
      },
      {
        title: 'New phone',
        description: 'Iphone 18',
        category: 'Tech',
        photo: null,
        date: formatDate('2025-12-12'), // ✅ Convertido a formato correcto
        type: 'expense',
        amount: 1200,
        fk_user_id: lautaroUser.id, // 🔥 Usamos el ID real del usuario root
      },
      {
        title: 'salary',
        description: 'my own job',
        category: 'salary',
        photo: null,
        date: formatDate('2025-12-12'), // ✅ Convertido a formato correcto
        type: 'income',
        amount: 1000,
        fk_user_id: lautaroUser.id, // 🔥 Usamos el ID real del usuario root
      },
    ];

    await Transaction.bulkCreate(transactions, { validate: true });

    console.log('✔ Transacciones insertadas correctamente.');
  } catch (error) {
    console.error('❌ Error insertando transacciones:', error);
  }
}

seedTransactions();
