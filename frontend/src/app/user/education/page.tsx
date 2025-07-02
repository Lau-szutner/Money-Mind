'use client';
import CourseCard from '@/app/components/CourseCard';
import { useEffect, useState } from 'react';
import FilterByCourse from '@/app/components/FilterByCourse';
import SearchBy from '@/app/components/SearchBy';
type Course = {
  id: number;
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

  let i = 1;

  return (
    <main className="flex flex-col w-full">
      <div className="mt-5">
        <SearchBy />
      </div>
      <section className="p-8 text-white w-full grid grid-cols-[0.3fr_1fr] gap-8">
        <div>
          <FilterByCourse />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
          {data.map((curso, index) => (
            <CourseCard key={index} {...curso} />
          ))}
        </div>
      </section>
    </main>
  );
}
