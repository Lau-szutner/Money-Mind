'use client';
import { useEffect, useState } from 'react';
import CourseCard from '@/app/components/CourseCard';

interface Instructor {
  id: number;
  name: string;
}

interface Course {
  id: number;
  slug: string;
  title: string;
  instructor: Instructor;
  description: string;
  thumbnailUrl?: string | null;
  topics: string[];
  isFree: boolean;
  price: number;
  currency: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function EducationPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${apiUrl}courses`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error(`Error al obtener cursos: ${response.status}`);
        }

        const result: Course[] = await response.json();
        setCourses(result);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error(err);
          setError('No pudimos cargar los cursos. Intentá de nuevo más tarde.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <main className="flex w-full flex-col">
      <section className="w-full p-8 text-white">
        {isLoading && (
          <p className="text-center text-neutral-400">Cargando cursos...</p>
        )}

        {!isLoading && error && (
          <p className="text-center text-red-400">{error}</p>
        )}

        {!isLoading && !error && courses.length === 0 && (
          <p className="text-center text-neutral-400">
            Todavía no hay cursos publicados.
          </p>
        )}

        {!isLoading && !error && courses.length > 0 && (
          <div className="grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
