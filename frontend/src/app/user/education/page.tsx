'use client';
import EducationTabBar from './components/EducationTabBar';
import CourseCard from '@/app/components/CourseCard';
import { useEffect, useState } from 'react';

type Course = {
  title: string;
  author: string;
  description: string;
  topics: string[];
  price: number;
};

export default function EducationPage() {
  const [data, setData] = useState<Course[]>([]);

  const fetchingCourses = async () => {
    try {
      const url = 'http://localhost:4000/courses/';
      const response = await fetch(url, { method: 'GET' });
      const data = await response.json();
      setData(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchingCourses();
  }, []);

  return (
    <main className="min-h-screen p-8 text-white">
      <h1 className="text-3xl font-bold mb-4">Educación</h1>
      <p>Información sobre tu formación académica, cursos, etc.</p>
      <EducationTabBar />

      <div className="flex gap-8 flex-wrap">
        {data.map((curso, index) => (
          <CourseCard key={index} {...curso} />
        ))}
      </div>
    </main>
  );
}
