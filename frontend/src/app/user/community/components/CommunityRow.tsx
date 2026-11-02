import {
  CommunityBasic,
  CommunityMembershipBasic,
} from '@/app/types/communities';

type MembershipStatus = CommunityMembershipBasic['status'] | undefined;

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

export const CommunityRow = ({
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
        className="flex min-w-0 flex-1 items-center gap-2 py-1 text-left text-gray-400 hover:text-greenIn disabled:cursor-not-allowed cursor-pointer"
        onClick={() => onOpen(community.slug)}
      >
        <span className="truncate">{community.name}</span>
      </button>
      <button
        type="button"
        disabled={busy || disabled || isBanned}
        onClick={() => onMembershipToggle(community, membershipStatus)}
        className="shrink-0 rounded px-2 py-1 text-xs text-greenIn hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        aria-label={actionLabel}
      >
        {actionText}
      </button>
    </li>
  );
};
