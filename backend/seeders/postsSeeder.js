import { Post, User, Community } from '../models/index.js';

async function seedPosts() {
  try {
    const rootUser = await User.findOne({ where: { email: 'root@gmail.com' } });
    const lautaroUser = await User.findOne({
      where: { email: 'lautaroszutner@gmail.com' },
    });

    const cInversiones = await Community.findOne({
      where: { slug: 'inversiones-bolsa' },
    });
    const cAhorro = await Community.findOne({
      where: { slug: 'ahorro-inteligente' },
    });

    if (!rootUser || !lautaroUser || !cInversiones || !cAhorro) {
      console.error('❌ Faltan datos necesarios para los posts.');
      return;
    }

    const generateSlug = (text) =>
      text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '') +
      '-' +
      Math.floor(Math.random() * 1000);

    const posts = [
      {
        title: 'Guía Definitiva: Mis 3 Pilares para Invertir con Disciplina',
        body: `Muchos creen que para invertir se necesita una fortuna, pero la clave está en el tiempo y la disciplina. Aquí les comparto mis 3 principios básicos:

1. **Fondo de Emergencia:** No inviertas dinero que vas a necesitar para pagar la renta el próximo mes. Primero asegura 3 meses de gastos básicos en una cuenta de alta liquidez.
2. **Interés Compuesto:** $100 hoy valen más que $100 mañana. La magia ocurre cuando reinviertes tus ganancias. Empieza pequeño, pero empieza ya.
3. **Diversificación Inteligente:** No pongas todos los huevos en la misma canasta. Mi cartera actual se divide en:
   * CEDEARs (Empresas estables)
   * Criptomonedas (Crecimiento/Riesgo)
   * Renta Fija (Bonos)

¿Ustedes qué estrategia están siguiendo actualmente para balancear el riesgo?`,
        fk_user_id: lautaroUser.id,
        fk_community_id: cInversiones.id,
      },
      {
        title: '¿Cómo leer un balance general antes de comprar una acción?',
        body: `Analizar una empresa va más allá de ver si el gráfico sube o baja. Antes de poner mi capital, siempre reviso estos tres puntos en su estado financiero:

- **Ratio de Liquidez:** ¿Tiene la empresa suficiente efectivo para pagar sus deudas a corto plazo?
- **Margen de Utilidad:** De cada dólar que venden, ¿cuánto queda realmente como beneficio?
- **Crecimiento de Ingresos:** Comparo el trimestre actual con el del año anterior (YoY).

Invertir sin analizar es apostar. ¿Qué otros indicadores consideran fundamentales antes de entrar en una posición?`,
        fk_user_id: rootUser.id,
        fk_community_id: cInversiones.id,
      },
      {
        title:
          'El Método 50/30/20: Cómo organizar tu sueldo sin morir en el intento',
        body: `Si llegas a fin de mes en cero, necesitas una estructura. Yo utilizo la regla 50/30/20 y me cambió la vida:

*   **50% para Necesidades:** Alquiler, servicios, comida y transporte.
*   **30% para Deseos:** Salidas, suscripciones como Netflix o ese café que tanto te gusta.
*   **20% para Ahorro e Inversión:** Este dinero se mueve apenas cobro, no espero a que sobre.

**Tip Pro:** Automatiza tus transferencias el primer día del mes. Si no ves el dinero en tu cuenta principal, no lo gastas.`,
        fk_user_id: rootUser.id,
        fk_community_id: cAhorro.id,
      },
      {
        title: 'Psicología del Ahorro: Por qué nos cuesta tanto guardar dinero',
        body: `El ahorro no es un problema de matemáticas, es un problema de hábitos. 

A menudo caemos en el "sesgo de gratificación instantánea": preferimos el placer de comprar algo hoy que la seguridad de tener tranquilidad mañana. Para combatir esto, yo aplico la **regla de las 72 horas**: 

Si veo algo que "quiero", espero 3 días. El 80% de las veces, el deseo desaparece y me doy cuenta de que no lo necesitaba. 

¿Cuál es su truco mental para evitar las compras impulsivas?`,
        fk_user_id: lautaroUser.id,
        fk_community_id: cAhorro.id,
      },
    ];

    const postsWithSlugs = posts.map((p) => ({
      ...p,
      slug: generateSlug(p.title),
      post_type: 'text',
    }));

    await Post.bulkCreate(postsWithSlugs, { validate: true });
    console.log('✔ Posts profesionales insertados correctamente.');
  } catch (error) {
    console.error('❌ Error al insertar posts:', error);
  }
}

seedPosts();
