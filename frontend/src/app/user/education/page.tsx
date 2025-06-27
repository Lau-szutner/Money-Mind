// app/education/page.tsx
import EducationTabBar from './components/EducationTabBar';
import Course from '@/app/components/Course';

export default function EducationPage() {
  const propiedades = {
    title: 'Monthly Budget',
    description:
      'Lear hoy yo yake controlo of your personal finances with pratical',
  };

  return (
    <main className="min-h-screen p-8 bg-neutral-950 text-white">
      <h1 className="text-3xl font-bold mb-4">Educación</h1>
      <p>Información sobre tu formación académica, cursos, etc.</p>
      <EducationTabBar />

      <Course title="hola"></Course>
    </main>
  );
}
