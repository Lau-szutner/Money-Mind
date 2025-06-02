'use client';

import { useState } from 'react';
import postsData from './datos.json';
import Post from './components/Post';
import NewPostModal from './components/NewPostModal';

export default function Community() {
  const [newPostOpen, setNewPostOpen] = useState(false); // Modal cerrada por defecto
  const [posts, setPosts] = useState(postsData); // Posts desde JSON, con estado local

  const handleAddPost = (data: { title: string; body: string }) => {
    const nuevoPost = {
      user: 'Lautaro', // usuario fijo
      ...data,
    };

    // Agregamos el nuevo post al inicio de la lista
    setPosts([nuevoPost, ...posts]);
  };

  return (
    <main className="min-h-screen p-8 bg-neutral-950 text-white">
      <h1 className="text-4xl font-bold mb-4">Community</h1>

      <div className="flex gap-5 mb-4">
        <div className="h-50 bg-background  p-5 rounded-md w-11/12 gap-5">
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
          onSubmit={handleAddPost}
        />
      )}

      {posts.map((post, i) => (
        <Post key={i} {...post} />
      ))}
    </main>
  );
}
