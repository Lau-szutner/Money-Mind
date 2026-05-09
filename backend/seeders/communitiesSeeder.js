import { User, Community } from '../models/index.js';

async function seedCommunitiesAndRelations() {
  try {
    const rootUser = await User.findOne({ where: { email: 'root@gmail.com' } });
    const lautaroUser = await User.findOne({
      where: { email: 'lautaroszutner@gmail.com' },
    });
    const adminUser = await User.findOne({
      where: { email: 'admin@gmail.com' },
    });

    if (!rootUser || !lautaroUser || !adminUser) {
      console.error('❌ No se encontraron todos los usuarios requeridos.');
      return;
    }

    // Crear comunidades temáticas
    const [finanzas] = await Community.findOrCreate({
      where: { name: 'Inversiones y Bolsa' },
      defaults: {
        slug: 'inversiones-bolsa',
        description:
          'Discusión sobre el mercado de valores, dividendos y estrategias a largo plazo.',
        owner_id: rootUser.id,
        is_private: false,
      },
    });

    const [ahorro] = await Community.findOrCreate({
      where: { name: 'Ahorro Inteligente' },
      defaults: {
        slug: 'ahorro-inteligente',
        description:
          'Trucos y métodos para optimizar gastos y vivir mejor con menos.',
        owner_id: lautaroUser.id,
        is_private: false,
      },
    });

    const [cripto] = await Community.findOrCreate({
      where: { name: 'Cripto & Web3' },
      defaults: {
        slug: 'cripto-web3',
        description:
          'Bitcoin, Ethereum y el futuro de las finanzas descentralizadas.',
        owner_id: adminUser.id,
        is_private: false,
      },
    });

    // Asociar usuarios a comunidades (Membresías)
    await rootUser.addCommunities([finanzas, ahorro]);
    await lautaroUser.addCommunities([finanzas, cripto]);
    await adminUser.addCommunities([ahorro, cripto]);

    console.log('✔ Comunidades financieras creadas correctamente.');
    return { finanzas, ahorro, cripto }; // Retornamos para usarlas si es necesario
  } catch (error) {
    console.error('❌ Error creando comunidades:', error);
  }
}

seedCommunitiesAndRelations();
