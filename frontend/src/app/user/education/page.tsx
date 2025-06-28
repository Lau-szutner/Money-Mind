// app/education/page.tsx

import EducationTabBar from './components/EducationTabBar';
import CourseCard from '@/app/components/CourseCard';

export default function EducationPage() {
  const curso = {
    title: 'Monthly Budget',
    author: 'Sarah Thompson',
    description:
      'Learn how to take control of your personal finances with practical budgeting techniques. This course provides step-by-step guidance to track your expenses, reduce unnecessary costs.',
    topics: ['Financial', 'Planning'],
    price: 20,
  };

  return (
    <main className="min-h-screen p-8 text-white">
      <h1 className="text-3xl font-bold mb-4">Educación</h1>
      <p>Información sobre tu formación académica, cursos, etc.</p>
      <EducationTabBar />
      <CourseCard {...curso} />
    </main>
  );
}
