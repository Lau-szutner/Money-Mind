// src/services/postService.ts
import Cookies from 'js-cookie';
import {
  CommunityPostResponse,
  PostCommentType,
} from '@/app/types/types';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getApiError = async (response: Response, fallback: string) => {
  if (response.headers.get('content-type')?.includes('application/json')) {
    const data = await response.json();
    return data.message || data.error || fallback;
  }
  return `${fallback} (HTTP ${response.status})`;
};

export const getFeedPosts = async (): Promise<CommunityPostResponse[]> => {
  // Extraemos el token de las cookies
  const token = Cookies.get('authToken');

  const res = await fetch(`${apiUrl}posts/feed`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('No tienes permisos o tu sesión expiró');
    }
    throw new Error('Error al cargar los posts de tu feed');
  }

  const data: CommunityPostResponse[] = await res.json();
  if (!Array.isArray(data)) {
    throw new Error('El servidor devolvió una lista de publicaciones inválida');
  }
  return data;
};

export const getCommunityPosts = async (
  slug: string,
): Promise<CommunityPostResponse[]> => {
  const token = Cookies.get('authToken');
  const res = await fetch(
    `${apiUrl}posts/community/${encodeURIComponent(slug)}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.message || 'Error al cargar las publicaciones de la comunidad',
    );
  }

  const data: CommunityPostResponse[] = await res.json();
  if (!Array.isArray(data)) {
    throw new Error('El servidor devolvió una lista de publicaciones inválida');
  }

  return data;
};

export const togglePostUpvote = async (
  postId: number,
): Promise<{ voteScore: number; userVote: 'up' | null }> => {
  const token = Cookies.get('authToken');
  const response = await fetch(`${apiUrl}posts/${postId}/upvote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(await getApiError(response, 'No se pudo registrar el voto'));
  }

  return response.json();
};

export const getPostComments = async (
  postId: number,
): Promise<PostCommentType[]> => {
  const token = Cookies.get('authToken');
  const response = await fetch(`${apiUrl}posts/${postId}/comments`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error(
      await getApiError(response, 'No se pudieron cargar los comentarios'),
    );
  }

  const comments: PostCommentType[] = await response.json();
  if (!Array.isArray(comments)) {
    throw new Error('El servidor devolvió una lista de comentarios inválida');
  }
  return comments;
};

export const createPostComment = async (
  postId: number,
  body: string,
  parentCommentId: number | null = null,
): Promise<PostCommentType> => {
  const token = Cookies.get('authToken');
  const response = await fetch(`${apiUrl}posts/${postId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ body, parentCommentId }),
  });

  if (!response.ok) {
    throw new Error(
      await getApiError(response, 'No se pudo publicar el comentario'),
    );
  }
  return response.json();
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

  const response = await fetch(`${apiUrl}posts`, {
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
