'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  getCommunityBySlug,
  joinCommunity,
  leaveCommunity,
} from '@/app/services/communityServices';
import { getCommunityPosts } from '@/app/services/postsService';
import {
  Community,
  CommunityMembershipStatus,
  PostType,
} from '@/app/types/communities';
import { formatDate } from '@/app/utils/formatters';
import { sortPostsByScore } from '@/app/utils/posts';
import Post from '@/app/user/community/components/Post';

export default function CommunityDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [community, setCommunity] = useState<Community | null>(null);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [membershipLoading, setMembershipLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [membershipStatus, setMembershipStatus] =
    useState<CommunityMembershipStatus | null>(null);

  useEffect(() => {
    const loadCommunity = async () => {
      setLoading(true);
      setLoadError(null);
      try {
        const [communityData, postsData] = await Promise.all([
          getCommunityBySlug(slug),
          getCommunityPosts(slug),
        ]);
        const communityPosts = postsData.map((post) => ({
          id: post.id,
          user: post.User.name,
          community: post.Community,
          title: post.title,
          body: post.body,
          createdAt: post.createdAt
            ? formatDate(post.createdAt)
            : '00/00/0000',
          voteScore: post.voteScore,
          commentCount: post.commentCount,
          userVote: post.userVote,
        }));

        setCommunity(communityData);
        setMembershipStatus(communityData.membershipStatus);
        setPosts(sortPostsByScore(communityPosts));
      } catch (error) {
        console.error(error);
        setLoadError(
          error instanceof Error
            ? error.message
            : 'No se pudo cargar la comunidad',
        );
      } finally {
        setLoading(false);
      }
    };

    loadCommunity();
  }, [slug]);

  const handleMembershipToggle = async () => {
    if (!community || membershipLoading) return;

    setMembershipLoading(true);
    setActionError(null);
    try {
      if (membershipStatus === 'active' || membershipStatus === 'pending') {
        await leaveCommunity(community.id);
        setMembershipStatus(null);
        if (membershipStatus === 'active') {
          setCommunity((current) =>
            current
              ? { ...current, memberCount: Math.max(0, current.memberCount - 1) }
              : current,
          );
        }
      } else {
        const result = await joinCommunity(community.id);
        setMembershipStatus(result.status);
        if (result.status === 'active') {
          setCommunity((current) =>
            current
              ? { ...current, memberCount: current.memberCount + 1 }
              : current,
          );
        }
      }
    } catch (error) {
      setActionError(
        error instanceof Error
          ? error.message
          : 'No se pudo actualizar la membresía',
      );
    } finally {
      setMembershipLoading(false);
    }
  };

  if (loading) {
    return <p className="p-5">Cargando comunidad...</p>;
  }

  if (loadError || !community) {
    return (
      <main className="p-5">
        <p role="alert" className="text-red-400">
          {loadError || 'Comunidad no encontrada'}
        </p>
      </main>
    );
  }

  const isFollowing = membershipStatus === 'active';
  const requestPending = membershipStatus === 'pending';
  const isBanned = membershipStatus === 'banned';

  return (
    <main className="p-5">
      <div className="bg-bgComponents p-10 rounded-xl mb-5">
        <h1 className="text-4xl font-bold">{community.name}</h1>
        {community.description && (
          <p className="text-xl mt-2">{community.description}</p>
        )}
        {community.image_url && (
          <img
            src={community.image_url}
            alt={community.name}
            className="mt-4 w-32 h-32"
          />
        )}
        <p className="mt-2">Miembros: {community.memberCount}</p>
        <p>Privada: {community.is_private ? 'Sí' : 'No'}</p>
        {actionError && (
          <p role="alert" className="mt-3 text-red-400">
            {actionError}
          </p>
        )}
        <button
          type="button"
          disabled={membershipLoading || isBanned}
          onClick={handleMembershipToggle}
          className={`mt-4 rounded p-2 text-white disabled:cursor-not-allowed disabled:opacity-50 ${
            isFollowing || requestPending
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-greenIn hover:bg-green-600'
          }`}
        >
          {membershipLoading
            ? 'Procesando...'
            : isFollowing
              ? 'Dejar de seguir'
              : requestPending
                ? 'Cancelar solicitud'
                : isBanned
                  ? 'No puedes unirte a esta comunidad'
                  : community.is_private
                    ? 'Solicitar unirme'
                    : 'Seguir comunidad'}
        </button>
      </div>

      <div className="space-y-4">
        {posts.length === 0 ? (
          <p>No hay posts en esta comunidad.</p>
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
    </main>
  );
}
