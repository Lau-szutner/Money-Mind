import { PostType } from '@/app/types/types';

export const sortPostsByScore = (posts: PostType[]) =>
  [...posts].sort((a, b) => {
    const scoreDifference = (b.voteScore ?? 0) - (a.voteScore ?? 0);
    if (scoreDifference !== 0) return scoreDifference;
    return b.id - a.id;
  });
