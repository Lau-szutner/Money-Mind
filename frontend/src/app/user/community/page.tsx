'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { formatDate } from '@/app/utils/formatters';
import { getPosts, createPost } from '@/app/services/postsService';
import { fetchCommunities } from '@/app/services/communityServices';
import Post from '@/app/user/community/components/Post';
import NewPostModal from './components/NewPostModal';

import SearchBy from '@/app/components/SearchBy';

import FilterByCommunity from '@/app/components/FilterByCommunity';
import type { Community } from '@/app/components/FilterByCommunity';

interface PostType {
  id: number;
  user: string;
  title: string;
  body: string;
  createdAt: string;
}

export default function Community() {
  const [loading, setLoading] = useState(true);
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [communitiesData, setCommunitiesData] = useState<CommunityType[]>([]);
  const [userName, setUserName] = useState<string | null>(null);

  interface CommunityType {
    id: number;
    name: string;
    slug: string;
    description: string;
    image_url: string | null;
  }

  useEffect(() => {
    const name = Cookies.get('userName') ?? null;
    setUserName(name);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();

        const postsFormatted = data.map(
          (post: {
            id: number;
            User: { name: string };
            title: string;
            body: string;
            createdAt: string;
          }) => ({
            id: post.id,
            user: post.User.name,
            title: post.title,
            body: post.body,
            createdAt: post.createdAt
              ? formatDate(post.createdAt)
              : '00/00/0000',
          }),
        );

        setPosts(postsFormatted);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const loadCommunities = async () => {
      try {
        const comunidades = await fetchCommunities();
        setCommunitiesData(comunidades);
      } catch (error) {
        console.error(error);
      }
    };

    loadCommunities();
  }, []);

  const handleCreatePost = async (data: { title: string; body: string }) => {
    try {
      const result = await createPost(data);

      const newPost: PostType = {
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
          className="rounded-md p-5 w-64 text-2xl font-light bg-bgComponents transition hover:bg-green-600 focus:ring-2 focus:ring-greenIn"
          onClick={() => setNewPostOpen((prev) => !prev)}
          aria-label="New post"
        >
          New post
        </button>
      </div>
      <section className="p-8 text-white w-full grid grid-cols-[0.3fr_1fr] gap-8">
        <FilterByCommunity communities={communitiesData} />

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
