import { Course, User } from '../models/index.js';

async function coursesSeeder() {
  try {
    // Obtenemos instructores existentes para no hardcodear IDs a ciegas.
    // Ajusta el criterio de búsqueda según cómo identifiques instructores en tu tabla de usuarios.
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
        'Faltan instructores en la base de datos. Ejecuta el seeder de usuarios primero.',
      );
    }

    await Course.bulkCreate([
      {
        title: 'Presupuesto Mensual',
        slug: 'presupuesto-mensual',
        fk_instructor_id: root.id,
        description:
          'Aprende a controlar tus finanzas personales con técnicas prácticas de presupuesto. Este curso proporciona una guía paso a paso para registrar tus gastos y reducir costos innecesarios.',
        shortDescription:
          'Técnicas prácticas para registrar gastos y reducir costos.',
        topics: ['Presupuesto', 'Seguimiento de Gastos', 'Hábitos de Ahorro'],
        isFree: true,
        price: 0,
        currency: 'USD',
        status: 'published',
        publishedAt: new Date(),
      },
      {
        title: 'Grandes Objetivos Sin Estrés',
        slug: 'grandes-objetivos-sin-estres',
        fk_instructor_id: lautaro.id,
        description:
          'Ya sea que estés ahorrando para un auto, vacaciones o un fondo de emergencia, este curso te ayudará a construir una estrategia de ahorro personalizada. Comprende objetivos a corto y largo plazo, automatiza tus ahorros',
        shortDescription:
          'Construye una estrategia de ahorro personalizada para objetivos a corto y largo plazo.',
        topics: [
          'Establecimiento de Objetivos',
          'Ahorros Automatizados',
          'Fondo de Emergencia',
        ],
        isFree: true,
        price: 0,
        currency: 'USD',
        status: 'published',
        publishedAt: new Date(),
      },
      {
        title: 'Tarjetas de Crédito',
        slug: 'tarjetas-de-credito',
        fk_instructor_id: admin.id,
        description:
          'Descubre cómo usar las tarjetas de crédito de manera responsable, evita trampas comunes y aumenta tu puntuación crediticia. Este curso explica cómo funcionan los intereses, los límites y el historial crediticio',
        shortDescription:
          'Usa las tarjetas de crédito responsablemente y mejora tu puntuación crediticia.',
        topics: [
          'Puntuación de Crédito',
          'Tasas de Interés',
          'Gasto Responsable',
        ],
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
