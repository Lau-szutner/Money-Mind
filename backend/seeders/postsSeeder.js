import { Post, User } from '../models/index.js';

async function seedPosts() {
  try {
    const rootUser = await User.findOne({ where: { email: 'root@gmail.com' } });
    const lautaroUser = await User.findOne({
      where: { email: 'lautaroszutner@gmail.com' },
    });

    if (!rootUser || !lautaroUser) {
      console.error('❌ No se encontraron todos los usuarios requeridos.');
      return;
    }

    const posts = [
      {
        title: '¿Por dónde empezar con la educación financiera?',
        body: 'Estoy iniciando en el mundo de las finanzas personales. ¿Qué libros, cursos o videos recomiendan para entender los conceptos básicos de ahorro, presupuesto e inversión?',
        fk_user_id: rootUser.id,
      },
      {
        title: 'Errores que cometí al ahorrar dinero',
        body: 'Durante mucho tiempo intenté ahorrar sin un plan claro. Compartí mis errores para que otros puedan evitarlos y empezar con el pie derecho.',
        fk_user_id: rootUser.id,
      },
      {
        title: 'Método 50/30/20: ¿Funciona realmente?',
        body: 'Estoy probando el método 50/30/20 para dividir mis ingresos. ¿Alguien más lo usa? Me gustaría conocer experiencias reales.',
        fk_user_id: rootUser.id,
      },
      {
        title: 'Cómo empecé a invertir con poco dinero',
        body: 'Quiero contar cómo comencé a invertir en fondos comunes de inversión desde cero. Ideal para quienes creen que se necesita mucho dinero para empezar.',
        fk_user_id: lautaroUser.id,
      },
      {
        title: 'Aplicaciones útiles para controlar gastos',
        body: '¿Qué apps usan para registrar gastos diarios y mantenerse organizados financieramente? Estoy buscando una opción fácil de usar.',
        fk_user_id: lautaroUser.id,
      },
      {
        title: 'Educación financiera en escuelas: ¿Sí o no?',
        body: 'Creo que deberíamos aprender sobre finanzas desde jóvenes. ¿Qué opinan ustedes? ¿Les enseñaron algo en la escuela o aprendieron por su cuenta?',
        fk_user_id: lautaroUser.id,
      },
    ];

    await Post.bulkCreate(posts, { validate: true });
    console.log('✔ Posts sobre educación financiera insertados correctamente.');
  } catch (error) {
    console.error('❌ Error al insertar posts:', error);
  }
}

seedPosts();
