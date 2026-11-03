'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { togglePostUpvote } from '@/app/services/postsService';

import { PostType } from '@/app/types/communities';
import { PostActions } from '@/app/user/community/components/PostActions';
import { CommentSection } from '@/app/user/community/components/CommentSection';
import { usePostComments } from '@/app/user/community/hooks/usePostComments';

interface PostProps extends PostType {
  onVoteChange?: (
    postId: number,
    voteScore: number,
    userVote: 'up' | null,
  ) => void;
}

const Post = ({
  id,
  user,
  title,
  body,
  createdAt,
  community,
  voteScore = 0,
  commentCount = 0,
  userVote = null,
  onVoteChange,
}: PostProps) => {
  const [score, setScore] = useState(voteScore);
  const [currentVote, setCurrentVote] = useState(userVote);
  const [voteLoading, setVoteLoading] = useState(false);
  const [voteError, setVoteError] = useState<string | null>(null);

  const {
    comments,
    commentsCount,
    commentsOpen,
    commentsLoading,
    commentsError,
    toggleComments,
    retryLoadingComments,
    replyToComment,
    addComment,
  } = usePostComments(id, commentCount);

  // MARK: PostActions Handlers
  const handleUpvote = async () => {
    if (voteLoading) return;

    setVoteLoading(true);
    setVoteError(null);
    try {
      const result = await togglePostUpvote(id);
      setScore(result.voteScore);
      setCurrentVote(result.userVote);
      onVoteChange?.(id, result.voteScore, result.userVote);
    } catch (requestError) {
      setVoteError(
        requestError instanceof Error
          ? requestError.message
          : 'No se pudo registrar el voto',
      );
    } finally {
      setVoteLoading(false);
    }
  };

  return (
    <article className="border-t border-gray-600 p-5 hover:bg-background">
      <header className="flex flex-wrap items-center gap-3 text-sm">
        <p className="text-greenIn">/{community.name}</p>
        <span aria-hidden="true">•</span>
        <p className="font-light">{createdAt}</p>
        <p className="ml-auto">{user}</p>
      </header>
      <div className="flex flex-col gap-5 py-5">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="wraps-break-words">
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      </div>

      <PostActions
        score={score}
        currentVote={currentVote}
        voteLoading={voteLoading}
        commentsCount={commentsCount}
        commentsOpen={commentsOpen}
        onUpvote={handleUpvote}
        onToggleComments={toggleComments}
      />

      {voteError && (
        <p role="alert" className="mt-3 text-sm text-red-400">
          {voteError}
        </p>
      )}
      {commentsOpen && (
        <CommentSection
          comments={comments}
          loading={commentsLoading}
          error={commentsError}
          onRetry={retryLoadingComments}
          onReply={replyToComment}
          onComment={addComment}
          onCancel={toggleComments}
        />
      )}
    </article>
  );
};

export default Post;
