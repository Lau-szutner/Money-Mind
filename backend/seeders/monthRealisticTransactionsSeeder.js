import { Transaction, User } from '../models/index.js';

async function monthRealisticTransactionsSeeder() {
  try {
    const rootUser = await User.findOne({ where: { email: 'root@gmail.com' } });
    const lautaroUser = await User.findOne({
      where: { email: 'lautaroszutner@gmail.com' },
    });

    if (!rootUser && !lautaroUser) {
      console.error(
        '❌ No se encontró ningún usuario para sembrar transacciones realistas.',
      );
      return;
    }

    const userIds = [rootUser?.id, lautaroUser?.id].filter(Boolean);

    const formatDate = (year, month, day, hour = 12) => {
      const date = new Date(year, month - 1, day, hour, 0, 0);
      return date.toISOString().slice(0, 19).replace('T', ' ');
    };

    // Plantillas de transacciones recurrentes y ocasionales
    const buildRealisticTransactionsForUser = (userId, offsetDays = 0) => {
      const year = 2026;
      const month = 8;
      const items = [];

      // 1. Ingresos
      items.push({
        title: 'Cobro de Sueldo',
        description: 'Ingreso mensual principal',
        category: 'Salario',
        photo: null,
        date: formatDate(year, month, 1 + offsetDays, 9),
        type: 'income',
        amount: 1200000,
        fk_user_id: userId,
      });

      items.push({
        title: 'Proyecto Frontend Freelance',
        description: 'Pago por desarrollo Web',
        category: 'Freelance',
        photo: null,
        date: formatDate(year, month, 15, 18),
        type: 'income',
        amount: 350000,
        fk_user_id: userId,
      });

      items.push({
        title: 'Bono por Performance',
        description: 'Incentivo trimestral',
        category: 'Bono',
        photo: null,
        date: formatDate(year, month, 20, 11),
        type: 'income',
        amount: 150000,
        fk_user_id: userId,
      });

      // 2. Gastos Fijos de Inicio/Mitad de Mes
      items.push({
        title: 'Pago de Impuestos y Servicios',
        description: 'Luz, gas y servicios municipales',
        category: 'Impuestos',
        photo: null,
        date: formatDate(year, month, 5, 10),
        type: 'expense',
        amount: 45000,
        fk_user_id: userId,
      });

      items.push({
        title: 'Cuota de Gimnasio',
        description: 'Membresía mensual',
        category: 'Deportes',
        photo: null,
        date: formatDate(year, month, 8, 14),
        type: 'expense',
        amount: 28000,
        fk_user_id: userId,
      });

      // 3. Gastos Variables y Periódicos (Compras semanales, comidas, tecnología, libros)
      const dynamicExpenses = [
        {
          days: [2, 9, 16, 23, 29],
          title: 'Compra Semanal Supermercado',
          category: 'Supermercado',
          amounts: [65000, 82000, 54000, 71000, 48000],
        },
        {
          days: [3, 6, 11, 14, 18, 21, 25, 28],
          title: 'Almuerzo / Salida a Comer',
          category: 'Comida',
          amounts: [8500, 12000, 9500, 15000, 7800, 11000, 14500, 9000],
        },
        {
          days: [4, 12, 19, 26],
          title: 'Suscripciones y Cine',
          category: 'Entretenimiento',
          amounts: [6500, 12000, 4500, 8900],
        },
        {
          days: [7, 22],
          title: 'Farmacia y Medicamentos',
          category: 'Salud',
          amounts: [14500, 9800],
        },
        {
          days: [10, 24],
          title: 'Compra de Libros / Cursos',
          category: 'Libros',
          amounts: [22000, 18500],
        },
        {
          days: [13, 27],
          title: 'Periféricos y Gadgets',
          category: 'Tecnología',
          amounts: [45000, 89000],
        },
      ];

      dynamicExpenses.forEach((group) => {
        group.days.forEach((day, index) => {
          const adjustedDay = Math.min(Math.max(day + offsetDays, 1), 30);
          items.push({
            title: group.title,
            description: 'Gasto registrado en el mes',
            category: group.category,
            photo: null,
            date: formatDate(year, month, adjustedDay, 13 + (index % 6)),
            type: 'expense',
            amount: group.amounts[index % group.amounts.length],
            fk_user_id: userId,
          });
        });
      });

      return items;
    };

    const seedData = [];

    userIds.forEach((userId, index) => {
      const userTransactions = buildRealisticTransactionsForUser(userId, index);
      seedData.push(...userTransactions);
    });

    if (!seedData.length) {
      console.log('⚠ No se generaron transacciones simuladas.');
      return;
    }

    const created = await Transaction.bulkCreate(seedData, { validate: true });

    console.log(
      `✔ ${created.length} transacciones realistas insertadas correctamente.`,
    );
  } catch (error) {
    console.error('❌ Error insertando transacciones realistas:', error);
  }
}

export default monthRealisticTransactionsSeeder;

monthRealisticTransactionsSeeder();
