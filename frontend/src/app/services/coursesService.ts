import Cookies from 'js-cookie';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface CreateCoursePayload {
  title: string;
  description: string;
  shortDescription?: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  topics?: string;
  isFree?: boolean;
  price?: number;
  currency?: string;
  status?: string;
}

export const getMyCourses = async () => {
  const token = Cookies.get('authToken');
  if (!token) throw new Error('No estás autenticado');

  const response = await fetch(`${apiUrl}courses/my`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'No se pudieron cargar tus cursos');
  }

  return response.json();
};

export const createCourse = async (data: CreateCoursePayload) => {
  const token = Cookies.get('authToken');
  if (!token) throw new Error('No estás autenticado');

  const response = await fetch(`${apiUrl}courses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.error || 'No se pudo crear el curso');
  }

  return result;
};

export const updateCourse = async (id: number, data: CreateCoursePayload) => {
  const token = Cookies.get('authToken');
  if (!token) throw new Error('No estás autenticado');

  const response = await fetch(`${apiUrl}courses/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.error || 'No se pudo actualizar el curso');
  }

  return result;
};

export const deleteCourse = async (id: number) => {
  const token = Cookies.get('authToken');
  if (!token) throw new Error('No estás autenticado');

  const response = await fetch(`${apiUrl}courses/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'No se pudo eliminar el curso');
  }

  return response.json();
};
