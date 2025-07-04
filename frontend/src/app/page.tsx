import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen text-white px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-20 bg-">
        {/* Sobre la marca */}
        <section className="grid md:grid-cols-2 gap-2 items-stretch">
          <div className="space-y-2 bg-bgComponents p-5 rounded-xl h-full">
            <h2 className="text-2xl font-semibold text-white">
              ¿Qué es <span className="text-green-500">Money</span>Mind?
            </h2>

            <p className="text-gray-400 ">
              MoneyMind nace con el objetivo de cerrar la brecha en educación
              financiera que muchas personas enfrentan. No solo te enseñamos a
              ahorrar e invertir, sino que te damos las herramientas para
              aplicar ese conocimiento en tu día a día, acompañándote con una
              comunidad activa que crece con vos.
            </p>
          </div>
          <div className="h-full flex items-center justify-center">
            <Image
              src="/banner.png"
              width={1000}
              height={100}
              alt="Money mind logo"
              className="object-contain h-full w-full"
            />
          </div>
        </section>

        {/* Secciones de la plataforma */}
        <section className="space-y-12">
          <h2 className="text-3xl font-semibold text-center text-white">
            Todo lo que incluye la plataforma
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Educación */}
            <div className="bg-bgComponents rounded-xl p-6 border border-neutral-800 space-y-3">
              <h3 className="text-xl font-bold text-greenIn">Educación</h3>
              <p className="text-sm text-gray-400">
                Accedé a cursos sobre ahorro, inversión, criptomonedas, acciones
                y más. Diseñados para todas las etapas de tu vida financiera.
              </p>
            </div>

            {/* Wallet */}
            <div className="bg-bgComponents rounded-xl p-6 border border-neutral-800 space-y-3">
              <h3 className="text-xl font-bold text-greenIn">
                Wallet inteligente
              </h3>
              <p className="text-sm text-gray-400">
                Cargá tu sueldo, registrá tus gastos y visualizá tus finanzas.
                Categorías, promedios y análisis claros que te ayudan a tomar
                mejores decisiones.
              </p>
            </div>

            {/* Comunidad */}
            <div className="bg-bgComponents rounded-xl p-6 border border-neutral-800 space-y-3">
              <h3 className="text-xl font-bold text-greenIn">Comunidad</h3>
              <p className="text-sm text-gray-400">
                Compartí experiencias, hacé preguntas, publicá tips de ahorro o
                inversión y descubrí que no estás solo en tu camino financiero.
              </p>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="text-center space-y-4 flex flex-col items-center">
          <h2 className="text-3xl font-semibold text-white">
            Empieza tu camino financiero con propósito
          </h2>

          <p className="text-gray-400">
            Unite a la comunidad de MoneyMind y aprendé a usar tu dinero con
            inteligencia.
          </p>

          <div className="mt-4 px-6 py-3 bg-[#39B54A] text-black rounded-xl font-semibold hover:bg-green-600 transition w-3/12 ">
            <Link href="/login" className="cursor-pointer">
              Empezar ahora
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
