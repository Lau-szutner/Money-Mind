'use client';

import { useEffect, useState } from 'react';
import Post from './components/Post';
import NewPostModal from './components/NewPostModal';
import Cookies from 'js-cookie';

interface PostType {
  id: number;
  user: string;
  title: string;
  body: string;
  createdAt?: string;
}

export default function Community() {
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // // Obtener el nombre del usuario autenticado
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const token = Cookies.get('authToken');
  //     if (!token) {
  //       console.warn('No token found');
  //       return;
  //     }

  //     try {
  //       const res = await fetch('/api/user/me', {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (res.ok) {
  //         const userData = await res.json();
  //         setUserName(userData.name);
  //       } else {
  //         console.warn('No se pudo obtener el usuario');
  //       }
  //     } catch (err) {
  //       console.error('Error al obtener usuario:', err);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  // Fetch posts desde backend al montar el componente
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('http://localhost:4000/posts/');
        if (!res.ok) throw new Error('Error al cargar los posts');
        const data = await res.json();

        const postsFormatted = data.map((post: any) => ({
          id: post.id,
          user: post.User.name, // <-- corregido aquí
          title: post.title,
          body: post.body,
          createdAt: post.createdAt,
        }));

        setPosts(postsFormatted);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleCreatePost = async (data: { title: string; body: string }) => {
    const token = Cookies.get('authToken');

    if (!token) {
      alert('No estás autenticado');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'No se pudo crear el post'}`);
        return;
      }

      const result = await response.json();
      alert('Post creado con éxito! ID: ' + result.postId);

      const newPost = {
        id: result.postId,
        user: userName || 'Usuario',
        title: data.title,
        body: data.body,
        createdAt: new Date().toISOString(),
      };
      setPosts([newPost, ...posts]);
    } catch (error: any) {
      alert('Error en la conexión: ' + error.message);
    }
  };

  return (
    <main className="min-h-screen p-8 bg-neutral-950 text-white">
      <h1 className="text-4xl font-bold mb-4">Community</h1>

      <div className="flex gap-5 mb-4">
        <div className="h-50 bg-background p-5 rounded-md w-11/12 gap-5">
          Search
        </div>
        <button
          className="w-1/12 bg-greenIn rounded-md"
          onClick={() => setNewPostOpen((prev) => !prev)}
        >
          +
        </button>
      </div>

      {newPostOpen && (
        <NewPostModal
          onClose={() => setNewPostOpen(false)}
          onSubmit={handleCreatePost}
        />
      )}

      {loading ? (
        <p>Cargando posts...</p>
      ) : posts.length === 0 ? (
        <p>No hay posts aún.</p>
      ) : (
        posts.map((post) => <Post key={post.id} {...post} />)
      )}
    </main>
  );
}
