import { User, Community, UserCommunity } from '../models/index.js';

async function seedUserCommunities() {
  try {
    // Buscar usuarios y comunidades existentes
    const rootUser = await User.findOne({ where: { email: 'root@gmail.com' } });
    const lautaroUser = await User.findOne({
      where: { email: 'lautaroszutner@gmail.com' },
    });
    const adminUser = await User.findOne({
      where: { email: 'admin@gmail.com' },
    });

    const community1 = await Community.findOne({
      where: { name: 'Comunidad 1' },
    });
    const community2 = await Community.findOne({
      where: { name: 'Comunidad 2' },
    });
    const community3 = await Community.findOne({
      where: { name: 'Comunidad 3' },
    });

    if (
      !rootUser ||
      !lautaroUser ||
      !adminUser ||
      !community1 ||
      !community2 ||
      !community3
    ) {
      console.error(
        '❌ No se encontraron todos los usuarios o comunidades requeridos.',
      );
      return;
    }

    // Crear relaciones con roles específicos
    await UserCommunity.findOrCreate({
      where: { user_id: rootUser.id, community_id: community1.id },
      defaults: { role: 'admin', status: 'active' },
    });
    await UserCommunity.findOrCreate({
      where: { user_id: rootUser.id, community_id: community2.id },
      defaults: { role: 'member', status: 'active' },
    });
    await UserCommunity.findOrCreate({
      where: { user_id: lautaroUser.id, community_id: community1.id },
      defaults: { role: 'moderator', status: 'active' },
    });
    await UserCommunity.findOrCreate({
      where: { user_id: lautaroUser.id, community_id: community3.id },
      defaults: { role: 'member', status: 'active' },
    });
    await UserCommunity.findOrCreate({
      where: { user_id: adminUser.id, community_id: community2.id },
      defaults: { role: 'admin', status: 'active' },
    });
    await UserCommunity.findOrCreate({
      where: { user_id: adminUser.id, community_id: community3.id },
      defaults: { role: 'moderator', status: 'active' },
    });

    console.log('✔ Relaciones usuario-comunidad insertadas correctamente.');
  } catch (error) {
    console.error('❌ Error creando relaciones usuario-comunidad:', error);
  }
}

seedUserCommunities();
