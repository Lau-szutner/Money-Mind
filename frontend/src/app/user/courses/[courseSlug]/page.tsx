const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/';

interface Instructor {
  id: number;
  name: string;
  email: string;
}

interface Course {
  id: number;
  slug: string;
  title: string;
  instructor: Instructor | null;
  description: string;
  shortDescription?: string | null;
  thumbnailUrl?: string | null;
  videoUrl?: string | null;
  topics: string[];
  isFree: boolean;
  price: number;
  currency: string;
}

const getCourseBySlug = async (slug: string) => {
  const response = await fetch(
    `${apiUrl}courses/bySlug/${encodeURIComponent(slug)}`,
    { method: 'GET', cache: 'no-store' },
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Curso no encontrado');
    }
    throw new Error('Error al cargar el curso');
  }

  return response.json() as Promise<Course>;
};

interface CourseDetailsProps {
  params: Promise<{
    courseSlug: string;
  }>;
}

export default async function CourseDetails({ params }: CourseDetailsProps) {
  const { courseSlug } = await params;
  const course = await getCourseBySlug(courseSlug);

  return (
    <main className="p-5">
      <section className="mx-auto max-w-5xl space-y-6">
        <div className="rounded-md bg-bgComponents p-8 shadow-xl shadow-black/10">
          <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
            <div className="relative overflow-hidden rounded-md bg-neutral-900">
              <img
                src={
                  course.thumbnailUrl?.trim()
                    ? course.thumbnailUrl
                    : `/courses/image-${course.id}.png`
                }
                alt={course.title}
                className="h-full w-full object-contain"
              />
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-greenIn">
                  Curso
                </p>
                <h1 className="mt-2 text-4xl font-bold text-white">
                  {course.title}
                </h1>
              </div>

              <div className="space-y-3 rounded-md bg-[#111111] p-6">
                <p className="text-sm text-neutral-400">
                  {course.shortDescription}
                </p>
                <div className="flex flex-wrap gap-2">
                  {course.topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full bg-neutral-800 px-3 py-1 text-xs font-semibold text-neutral-200"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-md bg-neutral-900 p-6 text-sm text-neutral-300">
                <p>
                  Instructor:{' '}
                  <strong>
                    {course.instructor?.name ||
                      course.instructor?.email ||
                      'No disponible'}
                  </strong>
                </p>
                <p>
                  Precio:{' '}
                  {course.isFree
                    ? 'Gratis'
                    : new Intl.NumberFormat('es-AR', {
                        style: 'currency',
                        currency: course.currency,
                      }).format(course.price)}
                </p>
                {course.videoUrl && (
                  <p>
                    Video:{' '}
                    <a
                      className="text-greenIn"
                      href={course.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Ver video
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-md bg-neutral-900 p-8 text-neutral-100">
            <h2 className="mb-4 text-2xl font-semibold">Descripción</h2>
            <p className="whitespace-pre-line text-neutral-300">
              {course.description}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
