'use client';

import { useEffect, useState } from 'react';

import { formatDate } from '@/app/utils/formatters';
import { getFeedPosts, createPost } from '@/app/services/postsService';
import { fetchCommunities } from '@/app/services/communityServices';
import Post from '@/app/user/community/components/Post';
import NewPostModal from './components/NewPostModal';
import { PostType, CommunityBasic } from '@/app/types/types';

import SearchBy from '@/app/components/SearchBy';

import FilterByCommunity from '@/app/components/FilterByCommunity';

export default function Community() {
  const [loading, setLoading] = useState(true);
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [communitiesData, setCommunitiesData] = useState<CommunityBasic[]>([]);
  const [userName, setUserName] = useState<string | null>(null);

  interface CommunityType {
    id: number;
    name: string;
    slug: string;
    description: string;
    image_url: string | null;
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getFeedPosts();

        const postsFormatted = data.map(
          (post: {
            id: number;
            User: { name: string };
            Community: { id: number; name: string; slug: string };
            title: string;
            body: string;
            createdAt: string;
          }) => ({
            id: post.id,
            user: post.User.name,
            community: post.Community,
            title: post.title,
            body: post.body,
            createdAt: post.createdAt
              ? formatDate(post.createdAt)
              : '00/00/0000',
          }),
        );

        console.log(data);

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
        let comunidades = await fetchCommunities();

        // for (const comunidad of comunidades) {
        //   console.log(comunidad); // ← acá ya es el objeto
        // }

        setCommunitiesData(comunidades);
      } catch (error) {
        console.error(error);
      }
    };

    loadCommunities();
  }, []);

  const handleCreatePost = async (data: {
    title: string;
    body: string;
    fk_community_id: number;
    post_type: 'text' | 'link' | 'image' | 'video';
    url?: string;
  }) => {
    try {
      const result = await createPost(data);

      const selectedCommunity = communitiesData.find(
        (c) => c.id === data.fk_community_id,
      );

      const newPost: PostType = {
        id: result.post.id,
        user: userName || 'Usuario',
        community: selectedCommunity || {
          id: data.fk_community_id,
          name: 'Comunidad',
          slug: '',
        },
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
    <main className="grid place-items-center w-full p-5 gap-5">
      <div className="w-full gap-5 grid grid-cols-[1fr_1fr]">
        <SearchBy />
        <button
          className="rounded-md p-5 w-fit text-2xl font-light bg-bgComponents transition hover:bg-green-600 focus:ring-2 focus:ring-greenIn"
          onClick={() => setNewPostOpen((prev) => !prev)}
          aria-label="New post"
        >
          New post
        </button>
      </div>
      <section className="text-white w-full grid  gap-8">
        <FilterByCommunity communities={communitiesData} />

        <div className="p-10 bg-bgComponents rounded-xl">
          {newPostOpen && (
            <NewPostModal
              onClose={() => setNewPostOpen(false)}
              onSubmit={handleCreatePost}
              communities={communitiesData}
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
