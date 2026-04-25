import { Transaction, User } from '../models/index.js';

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
        title: 'Frutas',
        description: 'plátano, manzana',
        category: 'Alimentación',
        photo: null,
        date: formatDate('2025-12-12'),
        type: 'expense',
        amount: 30,
        fk_user_id: rootUser.id,
      },
      {
        title: 'Salario',
        description: 'salario mensual',
        category: 'Salario',
        photo: null,
        date: formatDate('2025-12-12'),
        type: 'income',
        amount: 1200,
        fk_user_id: rootUser.id,
      },
      {
        title: 'Suscripción a Netflix',
        description: 'Pago mensual',
        category: 'Entretenimiento',
        photo: null,
        date: formatDate('2025-12-12'),
        type: 'expense',
        amount: 15,
        fk_user_id: rootUser.id,
      },
      {
        title: 'Proyecto Freelance',
        description: 'Diseño de sitio web para cliente',
        category: 'Trabajo Freelance',
        photo: null,
        date: formatDate('2025-12-12'),
        type: 'income',
        amount: 500,
        fk_user_id: rootUser.id,
      },
      {
        title: 'Membresía de Gimnasio',
        description: 'Cuota mensual de gimnasio',
        category: 'Salud',
        photo: null,
        date: formatDate('2025-12-12'),
        type: 'expense',
        amount: 40,
        fk_user_id: rootUser.id,
      },
      {
        title: 'Libro 1984',
        description: '1984',
        category: 'Libros',
        photo: null,
        date: formatDate('2025-12-12'),
        type: 'expense',
        amount: 40,
        fk_user_id: rootUser.id,
      },
      {
        title: 'Clases de Esquí',
        description: 'Clases de esquí',
        category: 'Deportes',
        photo: null,
        date: formatDate('2025-12-12'),
        type: 'income',
        amount: 100,
        fk_user_id: rootUser.id,
      },

      // Transacciones del lautaroUser
      {
        title: 'Nuevo teléfono',
        description: 'Iphone 18',
        category: 'Tecnología',
        photo: null,
        date: formatDate('2025-12-12'),
        type: 'expense',
        amount: 999,
        fk_user_id: lautaroUser.id,
      },
      {
        title: 'Salario',
        description: 'salario mensual',
        category: 'Salario',
        photo: null,
        date: formatDate('2025-12-12'),
        type: 'income',
        amount: 2500,
        fk_user_id: lautaroUser.id,
      },
      {
        title: 'Impuestos',
        description: 'Impuestos de 2025',
        category: 'Impuestos',
        photo: null,
        date: formatDate('2025-12-12'),
        type: 'expense',
        amount: 300,
        fk_user_id: lautaroUser.id,
      },
      {
        title: 'Cafetería',
        description: 'Desayuno en Starbucks',
        category: 'Comida',
        photo: null,
        date: formatDate('2025-12-12'),
        type: 'expense',
        amount: 12,
        fk_user_id: lautaroUser.id,
      },
      {
        title: 'Bono',
        description: 'Bono de rendimiento',
        category: 'Bono',
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
