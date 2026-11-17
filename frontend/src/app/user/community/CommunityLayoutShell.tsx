'use client';

import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  CommunityBasic,
  CommunityMembershipBasic,
  PostType,
} from '@/app/types/communities';
import {
  fetchAllCommunities,
  fetchCommunityMemberships,
} from '@/app/services/communityServices';
import { createPost } from '@/app/services/postsService';
import CommunitySideBar from '@/app/user/community/components/CommunitySideBar';
import NewPostModal, {
  NewPostData,
} from '@/app/user/community/components/NewPostModal';
import { CommunityLayoutProvider } from '@/app/user/community/CommunityLayoutContext';
import { formatDate } from '@/app/utils/formatters';
import { useAuthContext } from '@/context/AuthProvider';

export default function CommunityLayoutShell({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuthContext();
  const [communities, setCommunities] = useState<CommunityBasic[]>([]);
  const [memberships, setMemberships] = useState<CommunityMembershipBasic[]>(
    [],
  );
  const [communitiesLoading, setCommunitiesLoading] = useState(true);
  const [communitiesError, setCommunitiesError] = useState<string | null>(null);
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [membershipsLoaded, setMembershipsLoaded] = useState(false);
  const [createdPost, setCreatedPost] = useState<PostType | null>(null);

  const followedCommunities = communities.filter((community) =>
    memberships.some(
      (membership) =>
        membership.community_id === community.id &&
        membership.status === 'active',
    ),
  );

  useEffect(() => {
    let cancelled = false;

    const loadSidebar = async () => {
      try {
        const [allCommunities, userMemberships] = await Promise.all([
          fetchAllCommunities(),
          fetchCommunityMemberships(),
        ]);
        if (!cancelled) {
          setCommunities(allCommunities);
          setMemberships(userMemberships);
          setMembershipsLoaded(true);
        }
      } catch (error) {
        if (!cancelled) {
          setCommunitiesError(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar las comunidades',
          );
        }
      } finally {
        if (!cancelled) setCommunitiesLoading(false);
      }
    };

    void loadSidebar();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleMembershipChange = (
    communityId: number,
    status: CommunityMembershipBasic['status'] | null,
  ) => {
    setMembershipsLoaded(true);
    setMemberships((current) => {
      const remaining = current.filter(
        (membership) => membership.community_id !== communityId,
      );
      return status
        ? [...remaining, { community_id: communityId, status }]
        : remaining;
    });
  };

  const handleCreatedPostHandled = useCallback(() => setCreatedPost(null), []);

  const handleCreatePost = async (data: NewPostData) => {
    const community = followedCommunities.find(
      (item) => item.id === data.fk_community_id,
    );
    if (!community) {
      throw new Error('Debes seleccionar una comunidad que sigues');
    }

    const result = await createPost(data);
    setNewPostOpen(false);

    if (pathname === '/user/community') {
      setCreatedPost({
        id: result.post.id,
        authorId: user?.id ?? 0,
        user: user?.name || 'Usuario',
        community,
        title: data.title,
        body: data.body,
        createdAt: formatDate(new Date()),
      });
      return;
    }

    router.push(`/user/community/${encodeURIComponent(community.slug)}`);
  };

  return (
    <CommunityLayoutProvider
      value={{
        memberships,
        membershipsLoaded,
        createdPost,
        onCreatedPostHandled: handleCreatedPostHandled,
        onMembershipChange: handleMembershipChange,
      }}
    >
      <div className="grid w-full gap-8 p-5 text-white md:grid-cols-[300px_minmax(0,1fr)]">
        <CommunitySideBar
          communities={communities}
          memberships={memberships}
          loading={communitiesLoading}
          onCreatePost={() => setNewPostOpen((open) => !open)}
          onMembershipChange={handleMembershipChange}
        />

        <div className="min-w-0">
          {communitiesError && (
            <p role="alert" className="mb-4 text-red-400">
              {communitiesError}
            </p>
          )}

          {newPostOpen && followedCommunities.length > 0 && (
            <div className="mb-5 rounded-xl bg-bgComponents">
              <NewPostModal
                onClose={() => setNewPostOpen(false)}
                onSubmit={handleCreatePost}
                communities={followedCommunities}
              />
            </div>
          )}
          {newPostOpen &&
            !communitiesLoading &&
            !communitiesError &&
            followedCommunities.length === 0 && (
              <p className="mb-5 text-gray-300">
                Sigue una comunidad para poder publicar en ella.
              </p>
            )}

          {children}
        </div>
      </div>
    </CommunityLayoutProvider>
  );
}
