import { useState } from "react";

import {
  createPostComment,
  getPostComments,
  togglePostUpvote,
} from '@/app/services/postsService';

export const PostActions = () => {

    const [voteLoading, setVoteLoading] = useState(false);
      const [error, setError] = useState<string | null>(null);
      const handleUpvote = async () => {
        if (voteLoading) return;
    
        setVoteLoading(true);
        setError(null);
        try {
          const result = await togglePostUpvote(id);
          setScore(result.voteScore);
          setCurrentVote(result.userVote);
          onVoteChange?.(id, result.voteScore, result.userVote);
        } catch (requestError) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : 'No se pudo registrar el voto',
          );
        } finally {
          setVoteLoading(false);
        }
      };
    
  return (

<div className="flex items-center gap-4">
  <div className="flex w-fit items-center gap-2 rounded-lg bg-[#323232] p-2">
    <button
      type="button"
      onClick={handleUpvote}
      disabled={voteLoading}
      aria-label={currentVote === 'up' ? 'Quitar upvote' : 'Dar upvote'}
      aria-pressed={currentVote === 'up'}
      className={`flex items-center gap-1 rounded px-1 transition hover:text-greenIn disabled:opacity-50 cursor-pointer ${
        currentVote === 'up' ? 'text-greenIn' : 'text-white'
      }`}
    >
      <Image src="/icons/arrow_circle_up.svg" alt="" width={24} height={24} />
      <span>{score}</span>
    </button>
  </div>

  <button
    type="button"
    onClick={handleToggleComments}
    aria-expanded={commentsOpen}
    className="flex items-center gap-2 rounded-lg bg-[#323232] p-2 text-sm hover:text-greenIn cursor-pointer"
  >
    <Image src="/icons/comments.svg" alt="" width={24} height={24} />
    <span>
      {commentsCount} {commentsCount === 1 ? 'comentario' : 'comentarios'}
    </span>
  </button>
</div>;

  )
}



