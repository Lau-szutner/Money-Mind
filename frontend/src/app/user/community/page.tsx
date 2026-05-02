'use client';

import { useEffect, useState } from 'react';
import { FaCalendarCheck } from 'react-icons/fa';
import Cookies from 'js-cookie';

import Post from '@/app/user/community/components/Post';
import NewPostModal from './components/NewPostModal';
import FilterByCommunity from '@/app/components/FilterByCommunity';
import SearchBy from '@/app/components/SearchBy';

interface PostType {
  id: number;
  user: string;
  title: string;
  body: string;
  createdAt: string;
}
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Community() {
  const [loading, setLoading] = useState(true);
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [posts, setPosts] = useState<PostType[]>([]);

  const [userName, setUserName] = useState<string | null>(null);

  const formatDate = (date: string | Date) => {
    const d = new Date(date);
    // Usamos 'es-ES' para asegurar el orden día/mes/año
    return d.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${apiUrl}/posts/`);
        if (!res.ok) throw new Error('Error al cargar los posts');
        const data = await res.json();

        const postsFormatted = data.map((post: any) => ({
          id: post.id,
          user: post.User.name,
          title: post.title,
          body: post.body,
          // Usamos la función aquí
          createdAt: post.createdAt ? formatDate(post.createdAt) : '00/00/0000',
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
        alert(`Error: ${errorData.error || 'No se pudo crear el post'}`);
        return;
      }
      const result = await response.json();

      const newPost = {
        id: result.postId,
        user: userName || 'Usuario',
        title: data.title,
        body: data.body,
        createdAt: formatDate(new Date()),
      };

      setPosts([newPost, ...posts]);
    } catch (error: any) {
      alert('Error en la conexión: ' + error.message);
    }
  };

  return (
    <main className="">
      <div className="flex items-center mt-5 h-full">
        <SearchBy />
        <button
          className="rounded-md p-5 w-64  text-2xl font-light bg-bgComponents transition hover:bg-green-600  focus:ring-2 focus:ring-greenIn"
          onClick={() => setNewPostOpen((prev) => !prev)}
          aria-label="New post"
        >
          New post
        </button>
      </div>
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
            <p>Cargando posteos...</p>
          ) : posts.length === 0 ? (
            <p>No hay ningun posteo aún.</p>
          ) : (
            posts.map((post) => <Post key={post.id} {...post} />)
          )}
        </div>
      </section>
    </main>
  );
}
