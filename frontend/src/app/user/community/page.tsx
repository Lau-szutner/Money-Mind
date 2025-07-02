'use client';

import { useEffect, useState } from 'react';
import Post from './components/Post';
import NewPostModal from './components/NewPostModal';
import Cookies from 'js-cookie';
import FilterByCommunity from '@/app/components/FilterByCommunity';
import SearchBy from '@/app/components/SearchBy';
import { FaCalendarCheck } from 'react-icons/fa';

interface PostType {
  id: number;
  user: string;
  title: string;
  body: string;
  createdAt: string;
}

export default function Community() {
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Obtener el nombre del usuario autenticado
  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get('authToken');
      if (!token) {
        console.warn('No token found');
        return;
      }

      try {
        const res = await fetch('/api/user/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const userData = await res.json();
          setUserName(userData.name);
        } else {
          console.warn('No se pudo obtener el usuario');
        }
      } catch (err) {
        console.error('Error al obtener usuario:', err);
      }
    };

    fetchUserData();
  }, []);

  // Fetch posts desde backend al montar el componente
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('http://localhost:4000/posts/');
        if (!res.ok) throw new Error('Error al cargar los posts');
        const data = await res.json();

        const postsFormatted = data.map((post: any) => ({
          id: post.id,
          user: post.User.name,
          title: post.title,
          body: post.body,
          createdAt: post.created_at || post.createdAt || '',
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
        createdAt: new Date().toISOString().split('T')[0], // solo fecha, igual que backend
      };
      setPosts([newPost, ...posts]);
    } catch (error: any) {
      alert('Error en la conexión: ' + error.message);
    }
  };

  return (
    <main className="min-h-screen p-8 text-white">
      <SearchBy></SearchBy>
      <section className="p-8 text-white w-full grid grid-cols-[0.3fr_1fr] gap-8">
        <FilterByCommunity></FilterByCommunity>

        <div className="p-10 bg-bgComponents rounded-xl">
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
        </div>
      </section>
    </main>
  );
}
