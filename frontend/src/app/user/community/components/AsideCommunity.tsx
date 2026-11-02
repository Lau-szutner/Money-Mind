import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CommunityBasic,
  CommunityMembershipBasic,
  CommunitySideBarProps,
} from '@/app/types/communities';
import {
  joinCommunity,
  leaveCommunity,
} from '@/app/services/communityServices';
import { CommunityRow } from '@/app/user/community/components/CommunityRow';
import { SectionHeading } from '@/app/user/community/components/SectionHeading';

type MembershipStatus = CommunityMembershipBasic['status'] | undefined;
type CommunitySectionProps = CommunitySideBarProps;

export const AsideCommunity = ({
  communities,
  memberships,
  loading,
  onMembershipChange,
}: CommunitySectionProps) => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(true);
  const [busyCommunityId, setBusyCommunityId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const membershipStatusById = new Map<number, MembershipStatus>(
    memberships.map(({ community_id, status }) => [community_id, status]),
  );

  const handleMembershipToggle = async (
    community: CommunityBasic,
    status: MembershipStatus,
  ) => {
    setBusyCommunityId(community.id);
    setError(null);

    try {
      if (status === 'active' || status === 'pending') {
        await leaveCommunity(community.id);
        onMembershipChange(community.id, null);
      } else {
        const result = await joinCommunity(community.id);
        onMembershipChange(community.id, result.status);
      }
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'No se pudo actualizar la membresía',
      );
    } finally {
      setBusyCommunityId(null);
    }
  };

  return (
    <section className="h-fit rounded-xl bg-bgComponents p-5">
      <SectionHeading
        title="Comunidades"
        expanded={isExpanded}
        controlsId="community-list"
        onToggle={() => setIsExpanded((expanded) => !expanded)}
      />

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out motion-reduce:transition-none ${
          isExpanded
            ? 'grid-rows-[1fr] opacity-100'
            : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <ul id="community-list" aria-hidden={!isExpanded}>
            {error && (
              <li role="alert" className="py-2 text-sm text-red-400">
                {error}
              </li>
            )}
            {loading ? (
              <li className="py-2 text-sm text-gray-400">
                Cargando comunidades...
              </li>
            ) : communities.length === 0 ? (
              <li className="py-2 text-sm text-gray-400">
                No hay comunidades disponibles.
              </li>
            ) : (
              communities.map((community) => (
                <CommunityRow
                  key={community.id}
                  community={community}
                  membershipStatus={membershipStatusById.get(community.id)}
                  busy={busyCommunityId === community.id}
                  disabled={!isExpanded || busyCommunityId !== null}
                  onOpen={(slug) => router.push(`/user/community/${slug}`)}
                  onMembershipToggle={handleMembershipToggle}
                />
              ))
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};
