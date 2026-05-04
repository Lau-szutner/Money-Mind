// src/services/postService.ts
import Cookies from 'js-cookie';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getPosts = async () => {
  const res = await fetch(`${apiUrl}/posts/`);
  if (!res.ok) throw new Error('Error al cargar los posts');
  return res.json();
};

export const createPost = async (data: { title: string; body: string }) => {
  const token = Cookies.get('authToken');
  if (!token) throw new Error('No estás autenticado');

  const response = await fetch(`${apiUrl}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'No se pudo crear el post');
  }
  return response.json();
};
