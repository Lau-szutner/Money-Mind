import Image from 'next/image';

interface PostActionsProps {
  score: number;
  currentVote: 'up' | 'down' | null;
  voteLoading: boolean;
  commentsCount: number;
  commentsOpen: boolean;
  onUpvote: () => void;
  onToggleComments: () => void;
}

export const PostActions = ({
  score,
  currentVote,
  voteLoading,
  commentsCount,
  commentsOpen,
  onUpvote,
  onToggleComments,
}: PostActionsProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex w-fit items-center gap-2 rounded-lg bg-[#323232] p-2">
        <button
          type="button"
          onClick={onUpvote}
          disabled={voteLoading}
          aria-label={currentVote === 'up' ? 'Quitar upvote' : 'Dar upvote'}
          aria-pressed={currentVote === 'up'}
          className={`flex items-center gap-1 rounded px-1 transition hover:text-greenIn disabled:opacity-50 cursor-pointer ${currentVote === 'up' ? 'text-greenIn' : 'text-white'}`}
        >
          <Image
            src="/icons/arrow_circle_up.svg"
            alt=""
            width={24}
            height={24}
          />
          <span>{score}</span>
        </button>
      </div>

      <button
        type="button"
        onClick={onToggleComments}
        aria-expanded={commentsOpen}
        className="flex items-center gap-2 rounded-lg bg-[#323232] p-2 text-sm hover:text-greenIn cursor-pointer"
      >
        <Image src="/icons/comments.svg" alt="" width={24} height={24} />
        <span>
          {commentsCount} {commentsCount === 1 ? 'comentario' : 'comentarios'}
        </span>
      </button>
    </div>
  );
};
