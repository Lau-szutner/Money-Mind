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
      console.error('No se encontraron todos los usuarios requeridos.');
      return;
    }

    // Crear comunidades si no existen
    const [community1] = await Community.findOrCreate({
      where: { name: 'Comunidad 1' },
      defaults: {
        slug: 'comunidad-1',
        description: 'Descripción Comunidad 1',
        owner_id: rootUser.id,
        is_private: false,
      },
    });
    const [community2] = await Community.findOrCreate({
      where: { name: 'Comunidad 2' },
      defaults: {
        slug: 'comunidad-2',
        description: 'Descripción Comunidad 2',
        owner_id: lautaroUser.id,
        is_private: true,
      },
    });
    const [community3] = await Community.findOrCreate({
      where: { name: 'Comunidad 3' },
      defaults: {
        slug: 'comunidad-3',
        description: 'Descripción Comunidad 3',
        owner_id: adminUser.id,
        is_private: false,
      },
    });

    // Asociar usuarios a comunidades
    await rootUser.addCommunities([community1, community2]);
    await lautaroUser.addCommunities([community1, community3]);
    await adminUser.addCommunities([community2, community3]);

    console.log(
      '✔ Comunidades creadas y relaciones usuario-comunidad insertadas correctamente.',
    );
  } catch (error) {
    console.error('❌ Error creando comunidades o relaciones:', error);
  }
}

seedCommunitiesAndRelations();
