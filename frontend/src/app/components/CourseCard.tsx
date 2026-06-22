import { Instrument_Sans } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

interface Instructor {
  id: number;
  name: string;
  email: string;
}

interface CourseData {
  id: number;
  slug: string;
  title: string;
  instructor: Instructor | null;
  description: string;
  thumbnailUrl?: string | null;
  topics: string[];
  isFree: boolean;
  price: number;
  currency: string;
}

const CourseCard: React.FC<CourseData> = ({
  id,
  slug,
  title,
  instructor,
  description,
  thumbnailUrl,
  topics,
  isFree,
  price,
  currency,
}) => {
  return (
    <Link
      href={`/cursos/${slug}`}
      className="group flex w-full max-w-sm flex-col gap-4 rounded-lg bg-bgComponents p-6 transition-transform duration-200 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none motion-reduce:hover:scale-100"
    >
      <div className="relative h-48 w-full overflow-hidden rounded-md bg-neutral-800">
        <Image
          src={thumbnailUrl || `/courses/image-${id}.png`}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 384px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <h3 className="text-xl font-bold leading-tight">{title}</h3>

        <p className="text-sm font-medium text-neutral-300">
          {instructor?.email ?? 'Instructor no disponible'}
        </p>

        <p className="line-clamp-2 text-sm text-neutral-400">{description}</p>

        {topics.length > 0 && (
          <ul className="flex flex-wrap gap-2 pt-1">
            {topics.map((topic) => (
              <li
                key={topic}
                className="rounded-full bg-neutral-800 px-3 py-1 text-xs font-semibold text-neutral-200"
              >
                {topic}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-center justify-between pt-3">
          {isFree ? (
            <span className="rounded-full bg-green-500/15 px-3 py-1 text-sm font-bold text-green-400">
              Gratis
            </span>
          ) : (
            <span className="text-2xl font-bold">
              {new Intl.NumberFormat('es-AR', {
                style: 'currency',
                currency,
              }).format(price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
