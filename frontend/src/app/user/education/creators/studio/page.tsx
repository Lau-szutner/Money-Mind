'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAuthContext } from '@/context/AuthProvider';
import {
  createCourse as createCourseRequest,
  updateCourse as updateCourseRequest,
  deleteCourse as deleteCourseRequest,
  getMyCourses as getMyCoursesRequest,
} from '@/app/services/coursesService';

interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  thumbnailUrl?: string | null;
  videoUrl?: string | null;
  topics: string[];
  isFree: boolean;
  price: number;
  currency: string;
  status: string;
}

export default function Studio() {
  const { isAuthenticated, status } = useAuthContext();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    thumbnailUrl: '',
    videoUrl: '',
    topics: '',
    isFree: true,
    price: 0,
    currency: 'USD',
    status: 'published',
  });
  const [myCourses, setMyCourses] = useState<Course[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const isEditing = editingId !== null;

  const previewImage = useMemo(
    () => (formData.thumbnailUrl ? formData.thumbnailUrl : null),
    [formData.thumbnailUrl],
  );

  useEffect(() => {
    const loadMyCourses = async () => {
      if (status !== 'authenticated') return;
      try {
        const courses = await getMyCoursesRequest();
        setMyCourses(courses);
      } catch (error) {
        setErrorMessage((error as Error).message || 'Error al cargar cursos');
      }
    };
    loadMyCourses();
  }, [status]);

  const handleChange = (name: string, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      shortDescription: '',
      thumbnailUrl: '',
      videoUrl: '',
      topics: '',
      isFree: true,
      price: 0,
      currency: 'USD',
      status: 'published',
    });
    setEditingId(null);
  };

  const loadCourseForEditing = (course: Course) => {
    setFormData({
      title: course.title,
      description: course.description,
      shortDescription: course.shortDescription,
      thumbnailUrl: course.thumbnailUrl || '',
      videoUrl: course.videoUrl || '',
      topics: course.topics.join(', '),
      isFree: course.isFree,
      price: course.price,
      currency: course.currency,
      status: course.status,
    });
    setEditingId(course.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSaving(true);

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        shortDescription: formData.shortDescription,
        thumbnailUrl: formData.thumbnailUrl,
        videoUrl: formData.videoUrl,
        topics: formData.topics,
        isFree: formData.isFree,
        price: Number(formData.price),
        currency: formData.currency,
        status: formData.status,
      };

      if (isEditing) {
        const updatedCourse = await updateCourseRequest(editingId, payload);
        setSuccessMessage('Curso actualizado con éxito');
        setMyCourses((prev) =>
          prev.map((c) => (c.id === editingId ? updatedCourse : c)),
        );
      } else {
        const course = await createCourseRequest(payload);
        setSuccessMessage('Curso creado con éxito');
        setMyCourses((prev) => [course, ...prev]);
      }

      resetForm();
    } catch (error) {
      setErrorMessage((error as Error).message || 'Error al guardar el curso');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await deleteCourseRequest(id);
      setSuccessMessage('Curso eliminado correctamente');
      setMyCourses((prev) => prev.filter((course) => course.id !== id));
    } catch (error) {
      setErrorMessage((error as Error).message || 'Error al eliminar el curso');
    }
  };

  if (status === 'checking') {
    return (
      <main className="min-h-screen p-8 bg-neutral-950 text-white">
        <p>Cargando...</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen p-8 bg-neutral-950 text-white">
        <h1 className="text-3xl font-bold mb-6 text-center">Studio</h1>
        <p className="text-center text-neutral-300">
          Debes iniciar sesión para crear o administrar tus cursos.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8 bg-neutral-950 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Studio</h1>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-3xl border border-neutral-800 bg-neutral-900 p-8 shadow-xl shadow-black/20">
          <h2 className="text-2xl font-bold mb-4">
            {isEditing ? 'Editar curso' : 'Crear nuevo curso'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm text-neutral-300">
                Título
                <input
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="rounded-md border border-neutral-700 bg-neutral-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                  placeholder="Nombre del curso"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-neutral-300">
                Precio
                <input
                  type="number"
                  min={0}
                  value={formData.price}
                  onChange={(e) =>
                    handleChange('price', Number(e.target.value))
                  }
                  className="rounded-md border border-neutral-700 bg-neutral-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                  disabled={formData.isFree}
                />
              </label>
            </div>

            <label className="flex flex-col gap-2 text-sm text-neutral-300">
              Descripción
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={4}
                className="rounded-md border border-neutral-700 bg-neutral-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                placeholder="Explicá de qué trata el curso"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm text-neutral-300">
              Descripción corta
              <input
                value={formData.shortDescription}
                onChange={(e) =>
                  handleChange('shortDescription', e.target.value)
                }
                className="rounded-md border border-neutral-700 bg-neutral-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                placeholder="Frase breve para la tarjeta"
              />
            </label>

            <div className="grid gap-4 lg:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm text-neutral-300">
                URL de miniatura
                <input
                  value={formData.thumbnailUrl}
                  onChange={(e) => handleChange('thumbnailUrl', e.target.value)}
                  className="rounded-md border border-neutral-700 bg-neutral-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                  placeholder="https://..."
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-neutral-300">
                URL de video
                <input
                  value={formData.videoUrl}
                  onChange={(e) => handleChange('videoUrl', e.target.value)}
                  className="rounded-md border border-neutral-700 bg-neutral-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                  placeholder="https://..."
                />
              </label>
            </div>

            <label className="flex flex-col gap-2 text-sm text-neutral-300">
              Topics (separados por coma)
              <input
                value={formData.topics}
                onChange={(e) => handleChange('topics', e.target.value)}
                className="rounded-md border border-neutral-700 bg-neutral-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                placeholder="Ahorro, Inversión, Deuda"
              />
            </label>

            <div className="grid gap-4 lg:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm text-neutral-300">
                Estado
                <select
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="rounded-md border border-neutral-700 bg-neutral-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                >
                  <option value="published">Publicado</option>
                  <option value="draft">Borrador</option>
                </select>
              </label>
              <label className="flex items-center gap-3 text-sm text-neutral-300">
                <input
                  type="checkbox"
                  checked={formData.isFree}
                  onChange={(e) => handleChange('isFree', e.target.checked)}
                  className="h-4 w-4 rounded border-neutral-700 bg-neutral-800 text-blue-500"
                />
                Curso gratuito
              </label>
            </div>

            {errorMessage && (
              <div className="rounded-xl bg-red-600/20 p-4 text-sm text-red-200">
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div className="rounded-xl bg-emerald-600/20 p-4 text-sm text-emerald-200">
                {successMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex w-full justify-center rounded-xl bg-green-500 px-6 py-3 text-white transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving
                ? 'Guardando...'
                : isEditing
                  ? 'Guardar cambios'
                  : 'Crear curso'}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex w-full justify-center rounded-xl bg-neutral-700 px-6 py-3 text-white transition hover:bg-neutral-600"
              >
                Cancelar
              </button>
            )}
          </form>
        </section>

        <section className="rounded-3xl border border-neutral-800 bg-neutral-900 p-8 shadow-xl shadow-black/20">
          <h2 className="text-2xl font-bold mb-4">Mis cursos</h2>
          {myCourses.length === 0 ? (
            <p className="text-neutral-400">No tenés cursos creados aún.</p>
          ) : (
            <div className="space-y-4">
              {myCourses.map((course) => (
                <article
                  key={course.id}
                  className="rounded-3xl border border-neutral-800 bg-neutral-950 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{course.title}</h3>
                      <p className="text-sm text-neutral-400">
                        {course.shortDescription}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => loadCourseForEditing(course)}
                        className="rounded-full bg-blue-500/15 px-3 py-2 text-xs text-blue-300 transition hover:bg-blue-500/25"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(course.id)}
                        className="rounded-full bg-red-500/15 px-3 py-2 text-xs text-red-300 transition hover:bg-red-500/25"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-neutral-400">
                    <span>
                      {course.isFree
                        ? 'Gratis'
                        : `Precio: ${course.price} ${course.currency}`}
                    </span>
                    <span>{course.status}</span>
                    <span>{course.topics.join(', ')}</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      {previewImage && (
        <section className="mt-8 rounded-3xl border border-neutral-800 bg-neutral-900 p-6">
          <h2 className="text-xl font-semibold mb-4">
            Previsualización de miniatura
          </h2>
          <img
            src={previewImage}
            alt="Previsualización de miniatura"
            className="h-48 w-full rounded-3xl object-cover"
          />
        </section>
      )}
    </main>
  );
}
