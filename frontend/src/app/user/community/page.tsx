'use client';

import { useEffect, useState } from 'react';
import { formatDate } from '@/app/utils/formatters';
import { sortPostsByScore } from '@/app/utils/posts';
import { getFeedPosts } from '@/app/services/postsService';
import FeedPostCard from '@/app/user/community/components/FeedPostCard';
import { PostType } from '@/app/types/communities';
import { useCommunityLayout } from '@/app/user/community/CommunityLayoutContext';

export default function Community() {
  const { memberships, createdPost, onCreatedPostHandled } =
    useCommunityLayout();

  const [loading, setLoading] = useState(true);
  const [feedError, setFeedError] = useState<string | null>(null);
  const [feedRetry, setFeedRetry] = useState(0);
  const [posts, setPosts] = useState<PostType[]>([]);
  const followedCommunityIds = memberships
    .filter((membership) => membership.status === 'active')
    .map((membership) => membership.community_id)
    .sort((a, b) => a - b);
  const followedCommunityKey = followedCommunityIds.join(',');

  useEffect(() => {
    let cancelled = false;

    const fetchPosts = async () => {
      setLoading(true);
      setFeedError(null);
      try {
        const data = await getFeedPosts();

        const postsFormatted = data.map((post) => ({
          id: post.id,
          authorId: post.User.id,
          user: post.User.name,
          community: post.Community,
          title: post.title,
          body: post.body,
          createdAt: post.createdAt ? formatDate(post.createdAt) : '00/00/0000',
          voteScore: post.voteScore,
          commentCount: post.commentCount,
          userVote: post.userVote,
        }));

        if (!cancelled) setPosts(sortPostsByScore(postsFormatted));
      } catch (error) {
        if (!cancelled) {
          setFeedError(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar las publicaciones',
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchPosts();
    return () => {
      cancelled = true;
    };
  }, [followedCommunityKey, feedRetry]);

  useEffect(() => {
    if (!createdPost) return;
    setPosts((current) =>
      sortPostsByScore([
        createdPost,
        ...current.filter((post) => post.id !== createdPost.id),
      ]),
    );
    onCreatedPostHandled();
  }, [createdPost, onCreatedPostHandled]);

  return (
    <main className="min-w-0 rounded-xl bg-bgComponents p-5">
      {loading ? (
        <p>Cargando posteos...</p>
      ) : feedError ? (
        <div className="space-y-2 py-4">
          <p role="alert" className="text-red-400">
            {feedError}
          </p>
          <button
            type="button"
            onClick={() => setFeedRetry((current) => current + 1)}
            className="rounded-md bg-greenIn px-4 py-2 font-semibold text-black hover:opacity-90"
          >
            Reintentar
          </button>
        </div>
      ) : posts.length === 0 ? (
        <p>No hay publicaciones en las comunidades que sigues todavía.</p>
      ) : (
        posts.map((post) => (
          <FeedPostCard
            key={post.id}
            post={post}
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
    </main>
  );
}
