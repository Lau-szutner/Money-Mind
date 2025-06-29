'use client';
import CourseCard from '@/app/components/CourseCard';
import { useEffect, useState } from 'react';
import Image from 'next/image';

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
    <main className="min-h-screen p-8 text-white">
      <Image src={`/Banner.png`} alt="123" width="64" height="64"></Image>
      <div className="flex gap-8 flex-wrap">
        {data.map((curso, index) => (
          <CourseCard key={index} {...curso} />
        ))}
      </div>
    </main>
  );
}

// export function Avatar({ id, alt }) {
//   return <Image src={`/avatars/${id}.png`} alt={alt} width="64" height="64" />;
// }

// export function AvatarOfMe() {
//   return <Avatar id="me" alt="A portrait of me" />;
// }
