export default function Home() {
  return (
    <main className="min-h-screen bg-[#302E2F] text-white px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-20">

        {/* Hero */}
        <section className="text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-semibold text-[#39B54A]">
            MoneyMind
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Educación financiera, control inteligente de gastos y comunidad colaborativa. Todo en un mismo lugar.
          </p>
        </section>

        {/* Sobre la marca */}
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-white">¿Qué es MoneyMind?</h2>
            <p className="text-gray-400 text-base leading-relaxed">
              MoneyMind nace con el objetivo de cerrar la brecha en educación financiera que muchas personas enfrentan. 
              No solo te enseñamos a ahorrar e invertir, sino que te damos las herramientas para aplicar ese conocimiento en tu día a día, 
              acompañándote con una comunidad activa que crece con vos.
            </p>
          </div>
          <div className="w-full h-64 bg-neutral-800 rounded-xl flex items-center justify-center text-gray-500 text-sm">
            Imagen / gráfico del logo
          </div>
        </section>

        {/* Secciones de la plataforma */}
        <section className="space-y-12">
          <h2 className="text-3xl font-semibold text-center text-white">Todo lo que incluye la plataforma</h2>

          <div className="grid md:grid-cols-3 gap-8">

            {/* Educación */}
            <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800 space-y-3">
              <h3 className="text-xl font-medium text-white">Educación</h3>
              <p className="text-sm text-gray-400">
                Accedé a cursos sobre ahorro, inversión, criptomonedas, acciones y más. Diseñados para todas las etapas de tu vida financiera.
              </p>
            </div>

            {/* Wallet */}
            <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800 space-y-3">
              <h3 className="text-xl font-medium text-white">Wallet inteligente</h3>
              <p className="text-sm text-gray-400">
                Cargá tu sueldo, registrá tus gastos y visualizá tus finanzas. 
                Categorías, promedios y análisis claros que te ayudan a tomar mejores decisiones.
              </p>
            </div>

            {/* Comunidad */}
            <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800 space-y-3">
              <h3 className="text-xl font-medium text-white">Comunidad</h3>
              <p className="text-sm text-gray-400">
                Compartí experiencias, hacé preguntas, publicá tips de ahorro o inversión y descubrí que no estás solo en tu camino financiero.
              </p>
            </div>

          </div>
        </section>

        {/* CTA final */}
        <section className="text-center space-y-4">
          <h2 className="text-3xl font-semibold text-white">Empieza tu camino financiero con propósito</h2>
          <p className="text-gray-400">
            Unite a la comunidad de MoneyMind y aprendé a usar tu dinero con inteligencia.
          </p>
          <button className="mt-4 px-6 py-3 bg-[#39B54A] text-black rounded-xl font-semibold hover:bg-green-600 transition">
            Empezar ahora
          </button>
        </section>
      </div>
    </main>
  );
}
