import { User, Community, UserCommunity } from '../models/index.js';

async function seedUserCommunities() {
  try {
    // 1. Buscar usuarios existentes por email (se mantienen iguales)
    const rootUser = await User.findOne({ where: { email: 'root@gmail.com' } });
    const lautaroUser = await User.findOne({
      where: { email: 'lautaroszutner@gmail.com' },
    });
    const adminUser = await User.findOne({
      where: { email: 'admin@gmail.com' },
    });

    // 2. Buscar comunidades financieras por sus nuevos nombres
    const community1 = await Community.findOne({
      where: { name: 'Inversiones y Bolsa' },
    });
    const community2 = await Community.findOne({
      where: { name: 'Ahorro Inteligente' },
    });
    const community3 = await Community.findOne({
      where: { name: 'Cripto & Web3' },
    });

    // Validar que todo exista antes de relacionar
    if (
      !rootUser ||
      !lautaroUser ||
      !adminUser ||
      !community1 ||
      !community2 ||
      !community3
    ) {
      console.error(
        '❌ No se encontraron todos los usuarios o comunidades requeridos para las relaciones.',
      );
      return;
    }

    // 3. Crear relaciones con roles específicos
    // Relaciones para Root
    await UserCommunity.findOrCreate({
      where: { user_id: rootUser.id, community_id: community1.id },
      defaults: { role: 'admin', status: 'active' },
    });
    await UserCommunity.findOrCreate({
      where: { user_id: rootUser.id, community_id: community2.id },
      defaults: { role: 'member', status: 'active' },
    });

    // Relaciones para Lautaro
    await UserCommunity.findOrCreate({
      where: { user_id: lautaroUser.id, community_id: community1.id },
      defaults: { role: 'moderator', status: 'active' },
    });
    await UserCommunity.findOrCreate({
      where: { user_id: lautaroUser.id, community_id: community3.id },
      defaults: { role: 'member', status: 'active' },
    });

    // Relaciones para Admin
    await UserCommunity.findOrCreate({
      where: { user_id: adminUser.id, community_id: community2.id },
      defaults: { role: 'admin', status: 'active' },
    });
    await UserCommunity.findOrCreate({
      where: { user_id: adminUser.id, community_id: community3.id },
      defaults: { role: 'moderator', status: 'active' },
    });

    console.log(
      '✔ Relaciones usuario-comunidad financieras insertadas correctamente.',
    );
  } catch (error) {
    console.error('❌ Error creando relaciones usuario-comunidad:', error);
  }
}

seedUserCommunities();
