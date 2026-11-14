import { useState } from 'react';
import { togglePostUpvote } from '@/app/services/postsService';

interface UsePostVoteOptions {
  postId: number;
  initialVoteScore?: number;
  initialUserVote?: 'up' | 'down' | null;
  onVoteChange?: (
    postId: number,
    voteScore: number,
    userVote: 'up' | null,
  ) => void;
}

export const usePostVote = ({
  postId,
  initialVoteScore = 0,
  initialUserVote = null,
  onVoteChange,
}: UsePostVoteOptions) => {
  const [score, setScore] = useState(initialVoteScore);
  const [currentVote, setCurrentVote] = useState(initialUserVote);
  const [voteLoading, setVoteLoading] = useState(false);
  const [voteError, setVoteError] = useState<string | null>(null);

  const handleUpvote = async () => {
    if (voteLoading) return;

    setVoteLoading(true);
    setVoteError(null);
    try {
      const result = await togglePostUpvote(postId);
      setScore(result.voteScore);
      setCurrentVote(result.userVote);
      onVoteChange?.(postId, result.voteScore, result.userVote);
    } catch (error) {
      setVoteError(
        error instanceof Error ? error.message : 'No se pudo registrar el voto',
      );
    } finally {
      setVoteLoading(false);
    }
  };

  return { score, currentVote, voteLoading, voteError, handleUpvote };
};
