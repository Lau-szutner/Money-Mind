'use client';

import { useEffect, useState } from 'react';
import { formatDate } from '@/app/utils/formatters';
import { sortPostsByScore } from '@/app/utils/posts';
import { getFeedPosts, createPost } from '@/app/services/postsService';
import {
  fetchAllCommunities,
  fetchCommunityMemberships,
} from '@/app/services/communityServices';
import Post from '@/app/user/community/components/Post';
import NewPostModal from '@/app/user/community/components/NewPostModal';
import {
  PostType,
  CommunityBasic,
  CommunityMembershipBasic,
} from '@/app/types/communities';
import CommunitySideBar from '@/app/user/community/components/CommunitySideBar';
import { useAuthContext } from '@/context/AuthProvider';

export default function Community() {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [allCommunities, setAllCommunities] = useState<CommunityBasic[]>([]);
  const [memberships, setMemberships] = useState<CommunityMembershipBasic[]>(
    [],
  );
  const followedCommunities = allCommunities.filter((community) =>
    memberships.some(
      (membership) =>
        membership.community_id === community.id &&
        membership.status === 'active',
    ),
  );
  const followedCommunityIds = memberships
    .filter((membership) => membership.status === 'active')
    .map((membership) => membership.community_id)
    .sort((a, b) => a - b);
  const followedCommunityKey = followedCommunityIds.join(',');
  const [communitiesLoading, setCommunitiesLoading] = useState(true);
  const [communitiesError, setCommunitiesError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getFeedPosts();

        const postsFormatted = data.map((post) => ({
          id: post.id,
          user: post.User.name,
          community: post.Community,
          title: post.title,
          body: post.body,
          createdAt: post.createdAt ? formatDate(post.createdAt) : '00/00/0000',
          voteScore: post.voteScore,
          commentCount: post.commentCount,
          userVote: post.userVote,
        }));

        setPosts(sortPostsByScore(postsFormatted));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [followedCommunityKey]);

  useEffect(() => {
    const loadCommunities = async () => {
      try {
        const [all, userMemberships] = await Promise.all([
          fetchAllCommunities(),
          fetchCommunityMemberships(),
        ]);
        setAllCommunities(all);
        setMemberships(userMemberships);
      } catch (error) {
        console.error(error);
        setCommunitiesError(
          error instanceof Error
            ? error.message
            : 'No se pudieron cargar las comunidades',
        );
      } finally {
        setCommunitiesLoading(false);
      }
    };

    loadCommunities();
  }, []);

  const handleMembershipChange = (
    communityId: number,
    status: CommunityMembershipBasic['status'] | null,
  ) => {
    setMemberships((current) => {
      const remaining = current.filter(
        (membership) => membership.community_id !== communityId,
      );
      return status
        ? [...remaining, { community_id: communityId, status }]
        : remaining;
    });
  };

  const handleCreatePost = async (data: {
    title: string;
    body: string;
    fk_community_id: number;
    post_type: 'text' | 'link' | 'image' | 'video';
    url?: string;
  }) => {
    try {
      const result = await createPost(data);

      const selectedCommunity = followedCommunities.find(
        (c) => c.id === data.fk_community_id,
      );

      const newPost: PostType = {
        id: result.post.id,
        user: user?.name || 'Usuario',
        community: selectedCommunity || {
          id: data.fk_community_id,
          name: 'Comunidad',
          slug: '',
        },
        title: data.title,
        body: data.body,
        createdAt: formatDate(new Date()),
      };

      setPosts((current) => sortPostsByScore([newPost, ...current]));
    } catch (error: any) {
      alert('Error en la conexión: ' + error.message);
    }
  };

  return (
    <main className="grid place-items-center w-full p-5 gap-5">
      <div className="w-full gap-5 grid grid-cols-[1fr_1fr]">
        {/* <SearchBy /> */}
        <button
          className="rounded-md px-5 py-2 w-fit font-light bg-bgComponents transition hover:bg-green-600 focus:ring-2 focus:ring-greenIn hover:cursor-pointer"
          onClick={() => setNewPostOpen((prev) => !prev)}
          aria-label="New post"
        >
          Nueva publicacion
        </button>
      </div>
      <section className="text-white w-full grid gap-8 md:grid-cols-[300px_1fr]">
        <CommunitySideBar
          communities={allCommunities}
          memberships={memberships}
          loading={communitiesLoading}
          onMembershipChange={handleMembershipChange}
        />

        <div className="p-5 bg-bgComponents rounded-xl">
          {communitiesError && (
            <p role="alert" className="mb-4 text-red-400">
              {communitiesError}
            </p>
          )}

          {newPostOpen && followedCommunities.length > 0 && (
            <NewPostModal
              onClose={() => setNewPostOpen(false)}
              onSubmit={handleCreatePost}
              communities={followedCommunities}
            />
          )}
          {newPostOpen &&
            !communitiesLoading &&
            !communitiesError &&
            followedCommunities.length === 0 && (
              <p className="mb-4 text-gray-300">
                Sigue una comunidad para poder publicar en ella.
              </p>
            )}

          {loading ? (
            <p>Cargando posteos...</p>
          ) : posts.length === 0 ? (
            <p>No hay ningun posteo aún.</p>
          ) : (
            posts.map((post) => (
              <Post
                key={post.id}
                {...post}
                onVoteChange={(postId, voteScore, userVote) =>
                  setPosts((current) =>
                    sortPostsByScore(
                      current.map((item) =>
                        item.id === postId
                          ? { ...item, voteScore, userVote }
                          : item,
                      ),
                    ),
                  )
                }
              />
            ))
          )}
        </div>
      </section>
    </main>
  );
}
