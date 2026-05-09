import { Post, User, Community } from '../models/index.js';

async function seedPosts() {
  try {
    const rootUser = await User.findOne({ where: { email: 'root@gmail.com' } });
    const lautaroUser = await User.findOne({
      where: { email: 'lautaroszutner@gmail.com' },
    });

    // Buscamos las comunidades por su slug para repartir los posts
    const cInversiones = await Community.findOne({
      where: { slug: 'inversiones-bolsa' },
    });
    const cAhorro = await Community.findOne({
      where: { slug: 'ahorro-inteligente' },
    });

    if (!rootUser || !lautaroUser || !cInversiones || !cAhorro) {
      console.error('❌ Faltan datos (Usuarios o Comunidades) para los posts.');
      return;
    }

    const generateSlug = (text) =>
      text
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '') +
      '-' +
      Math.floor(Math.random() * 1000);

    const posts = [
      // Posts para la comunidad de INVERSIONES
      {
        title: '¿Por dónde empezar con la educación financiera?',
        body: 'Estoy iniciando en el mundo de las finanzas. ¿Qué recomiendan?',
        fk_user_id: rootUser.id,
        fk_community_id: cInversiones.id,
      },
      {
        title: 'Cómo empecé a invertir con poco dinero',
        body: 'Relato de mi experiencia con fondos comunes de inversión.',
        fk_user_id: lautaroUser.id,
        fk_community_id: cInversiones.id,
      },
      // Posts para la comunidad de AHORRO
      {
        title: 'Errores que cometí al ahorrar dinero',
        body: 'Comparto mis fallos para que no los repitan.',
        fk_user_id: rootUser.id,
        fk_community_id: cAhorro.id,
      },
      {
        title: 'Método 50/30/20: ¿Funciona realmente?',
        body: '¿Alguien usa esta regla de presupuesto?',
        fk_user_id: rootUser.id,
        fk_community_id: cAhorro.id,
      },
      {
        title: 'Aplicaciones útiles para controlar gastos',
        body: '¿Qué apps usan para registrar gastos diarios?',
        fk_user_id: lautaroUser.id,
        fk_community_id: cAhorro.id,
      },
      {
        title: 'Educación financiera en escuelas: ¿Sí o no?',
        body: 'Debatamos sobre la importancia de las finanzas en la educación temprana.',
        fk_user_id: lautaroUser.id,
        fk_community_id: cAhorro.id,
      },
    ];

    // Mapeamos para agregar el slug a cada uno
    const postsWithSlugs = posts.map((p) => ({
      ...p,
      slug: generateSlug(p.title),
      post_type: 'text',
    }));

    await Post.bulkCreate(postsWithSlugs, { validate: true });
    console.log(
      '✔ Posts distribuidos por comunidades insertados correctamente.',
    );
  } catch (error) {
    console.error('❌ Error al insertar posts:', error);
  }
}

seedPosts();
