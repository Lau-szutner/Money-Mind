// app/education/page.tsx

import EducationTabBar from './components/EducationTabBar';
import CourseCard from '@/app/components/CourseCard';

export default function EducationPage() {
  const cursos = [
    {
      title: 'Monthly Budget',
      author: 'Sarah Thompson',
      description:
        'Learn how to take control of your personal finances with practical budgeting techniques. This course provides step-by-step guidance to track your expenses, reduce unnecessary costs.',
      topics: ['Financial', 'Planning'],
      price: 20,
    },
    {
      title: 'Investment Basics',
      author: 'John Doe',
      description:
        'Understand the basics of investing, stocks, bonds, and portfolios. A beginner-friendly course to grow your wealth wisely.',
      topics: ['Investing', 'Finance'],
      price: 35,
    },
    {
      title: 'Debt Management',
      author: 'Jane Smith',
      description:
        'Learn practical strategies to manage and reduce your debt effectively. Take control of your financial future.',
      topics: ['Debt', 'Budgeting'],
      price: 25,
    },
  ];

  return (
    <main className="min-h-screen p-8 text-white">
      <h1 className="text-3xl font-bold mb-4">Educación</h1>
      <p>Información sobre tu formación académica, cursos, etc.</p>
      <EducationTabBar />

      <div className="flex gap-8 flex-wrap">
        {cursos.map((curso, index) => (
          <CourseCard key={index} {...curso} />
        ))}
      </div>
    </main>
  );
}
