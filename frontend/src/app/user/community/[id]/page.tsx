'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  getCommunityById,
  joinCommunity,
  leaveCommunity,
} from '@/app/services/communityServices';
import { getFeedPosts } from '@/app/services/postsService';
import { Community, PostType } from '@/app/types/types';
import { formatDate } from '@/app/utils/formatters';
import Post from '../components/Post';

export default function CommunityDetailPage() {
  const { id } = useParams();
  const [community, setCommunity] = useState<Community | null>(null);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    const loadCommunity = async () => {
      try {
        // Primero obtener todas las comunidades para mapear slug a id
        // O mejor, asumir que slug es único y buscar por id si es numérico, pero slug es string.
        // Para simplicidad, buscar comunidad por slug, pero el endpoint es por id.
        // Necesito un endpoint por slug o ajustar.

        // Por ahora, hardcode o asumir que slug es id. Mejor agregar endpoint GET /communities/bySlug/:slug

        // Para este ejemplo, usar getCommunityById asumiendo slug es id (temporal)
        const communityId = Number(id);
        if (isNaN(communityId)) {
          alert('ID inválido');
          return;
        }

        const communityData = await getCommunityById(communityId);
        setCommunity(communityData);

        // Verificar si el usuario es miembro
        const userMemberships = communityData.UserCommunities || [];
        const userMembership = userMemberships.find(
          (uc: any) => uc.status === 'active',
        );
        setIsMember(!!userMembership);

        // Obtener posts del feed y filtrar por community_id
        const allPosts = await getFeedPosts();
        const communityPosts = allPosts
          .filter((post: any) => post.Community.id === communityId)
          .map((post: any) => ({
            id: post.id,
            user: post.User.name,
            community: post.Community,
            title: post.title,
            body: post.body,
            createdAt: post.createdAt
              ? formatDate(post.createdAt)
              : '00/00/0000',
          }));

        setPosts(communityPosts);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadCommunity();
  }, [id]);

  const handleJoin = async () => {
    if (!community) return;
    try {
      await joinCommunity(community.id);
      setIsMember(true);
      alert('Te has unido a la comunidad');
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  };

  const handleLeave = async () => {
    if (!community) return;
    try {
      await leaveCommunity(community.id);
      setIsMember(false);
      alert('Has salido de la comunidad');
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!community) {
    return <p>Comunidad no encontrada</p>;
  }

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
        <p className="mt-2">
          Miembros: {community.UserCommunities?.length || 0}
        </p>
        <p>Privada: {community.is_private ? 'Sí' : 'No'}</p>
        <div className="mt-4">
          {isMember ? (
            <button
              onClick={handleLeave}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              Salir de la Comunidad
            </button>
          ) : (
            <button
              onClick={handleJoin}
              className="bg-greenIn text-white p-2 rounded hover:bg-green-600"
            >
              Unirse a la Comunidad
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {posts.length === 0 ? (
          <p>No hay posts en esta comunidad.</p>
        ) : (
          posts.map((post) => <Post key={post.id} {...post} />)
        )}
      </div>
    </main>
  );
}
