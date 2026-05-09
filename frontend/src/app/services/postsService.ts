// src/services/postService.ts
import Cookies from 'js-cookie';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getFeedPosts = async () => {
  // Extraemos el token de las cookies
  const token = Cookies.get('authToken');

  const res = await fetch(`${apiUrl}/posts/feed`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Si el token existe, lo enviamos; si no, el backend dará 401
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('No tienes permisos o tu sesión expiró');
    }
    throw new Error('Error al cargar los posts de tu feed');
  }

  return res.json();
};

export const createPost = async (data: {
  title: string;
  body: string;
  fk_community_id: number;
  post_type?: 'text' | 'link' | 'image' | 'video';
  url?: string;
}) => {
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
