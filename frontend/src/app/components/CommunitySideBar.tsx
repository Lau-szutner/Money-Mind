import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CommunityBasic, CommunityMembershipBasic } from '@/app/types/types';
import {
  joinCommunity,
  leaveCommunity,
} from '@/app/services/communityServices';

const CHAT_NAMES = ['MoneyGOl123', 'nickBlack1', 'CoffeBlow'];

type MembershipStatus = CommunityMembershipBasic['status'] | undefined;

interface CommunitySideBarProps {
  communities: CommunityBasic[];
  memberships: CommunityMembershipBasic[];
  loading: boolean;
  onMembershipChange: (
    communityId: number,
    status: CommunityMembershipBasic['status'] | null,
  ) => void;
}

type CommunitySectionProps = CommunitySideBarProps;

interface CommunityRowProps {
  community: CommunityBasic;
  membershipStatus: MembershipStatus;
  busy: boolean;
  disabled: boolean;
  onOpen: (slug: string) => void;
  onMembershipToggle: (
    community: CommunityBasic,
    status: MembershipStatus,
  ) => void;
}

const CommunityRow = ({
  community,
  membershipStatus,
  busy,
  disabled,
  onOpen,
  onMembershipToggle,
}: CommunityRowProps) => {
  const isFollowing = membershipStatus === 'active';
  const isPending = membershipStatus === 'pending';
  const isBanned = membershipStatus === 'banned';

  const actionLabel = isFollowing
    ? `Dejar de seguir ${community.name}`
    : isPending
      ? `Cancelar solicitud para ${community.name}`
      : isBanned
        ? `No puedes unirte a ${community.name}`
        : community.is_private
          ? `Solicitar acceso a ${community.name}`
          : `Seguir ${community.name}`;

  const actionText = busy
    ? '...'
    : isFollowing
      ? 'Siguiendo · Dejar'
      : isPending
        ? 'Pendiente · Cancelar'
        : isBanned
          ? 'No disponible'
          : community.is_private
            ? 'Solicitar'
            : 'Seguir';

  return (
    <li className="flex justify-between">
      <button
        type="button"
        disabled={disabled}
        className="flex min-w-0 flex-1 items-center gap-2 py-1 text-left text-gray-400 hover:text-greenIn disabled:cursor-not-allowed"
        onClick={() => onOpen(community.slug)}
      >
        <span className="truncate">{community.name}</span>
      </button>
      <button
        type="button"
        disabled={busy || disabled || isBanned}
        onClick={() => onMembershipToggle(community, membershipStatus)}
        className="shrink-0 rounded px-2 py-1 text-xs text-greenIn hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label={actionLabel}
      >
        {actionText}
      </button>
    </li>
  );
};

const CommunitySection = ({
  communities,
  memberships,
  loading,
  onMembershipChange,
}: CommunitySectionProps) => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(true);
  const [busyCommunityId, setBusyCommunityId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const membershipStatusById = new Map(
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

interface SectionHeadingProps {
  title: string;
  expanded: boolean;
  controlsId: string;
  onToggle: () => void;
}

const SectionHeading = ({
  title,
  expanded,
  controlsId,
  onToggle,
}: SectionHeadingProps) => (
  <div className="flex items-center justify-between">
    <p className="font-bold text-heading-sm">{title}</p>
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      aria-controls={controlsId}
      className="cursor-pointer rounded px-2 py-1 text-sm text-gray-400 hover:text-greenIn focus-visible:outline-2 focus-visible:outline-greenIn"
    >
      {expanded ? 'Ocultar' : 'Mostrar'}
    </button>
  </div>
);

const ChatsSection = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <section className="h-fit rounded-xl bg-bgComponents p-5">
      <SectionHeading
        title="Chats"
        expanded={isExpanded}
        controlsId="chat-list"
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
          <ul id="chat-list" aria-hidden={!isExpanded} className="font-light">
            {CHAT_NAMES.map((chat) => (
              <li key={chat} className="text-gray-400 hover:text-greenIn">
                {chat}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

const CommunitySideBar = (props: CommunitySideBarProps) => (
  <aside className="flex flex-col gap-5">
    <CommunitySection {...props} />
    <ChatsSection />
  </aside>
);

export default CommunitySideBar;
