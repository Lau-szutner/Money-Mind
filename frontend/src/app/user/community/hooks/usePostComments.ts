import { useState } from 'react';
import {
  createPostComment,
  getPostComments,
} from '@/app/services/postsService';
import { PostCommentType } from '@/app/types/communities';
import { buildCommentTree } from '@/app/utils/buildCommentTree';

const getErrorMessage = (error: unknown, fallback: string) =>
  error instanceof Error ? error.message : fallback;

export const usePostComments = (
  postId: number,
  initialCommentCount: number,
) => {
  const [comments, setComments] = useState<PostCommentType[]>([]);
  const [commentsCount, setCommentsCount] = useState(initialCommentCount);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState<string | null>(null);

  const loadComments = async () => {
    if (commentsLoaded || commentsLoading) return;

    setCommentsLoading(true);
    setCommentsError(null);
    try {
      const loadedComments = await getPostComments(postId);
      setComments(loadedComments);
      setCommentsLoaded(true);
    } catch (error) {
      setCommentsError(
        getErrorMessage(error, 'No se pudieron cargar los comentarios'),
      );
    } finally {
      setCommentsLoading(false);
    }
  };

  const toggleComments = async () => {
    const shouldOpen = !commentsOpen;
    setCommentsOpen(shouldOpen);
    if (shouldOpen) await loadComments();
  };

  const replyToComment = async (parentCommentId: number, body: string) => {
    const reply = await createPostComment(postId, body, parentCommentId);
    setComments((current) => [...current, reply]);
    setCommentsCount((current) => current + 1);
    setCommentsLoaded(true);
  };

  const addComment = async (body: string) => {
    const comment = await createPostComment(postId, body);
    setComments((current) => [...current, comment]);
    setCommentsCount((current) => current + 1);
    setCommentsLoaded(true);
    setCommentsOpen(true);
  };

  return {
    comments: buildCommentTree(comments),
    commentsCount,
    commentsOpen,
    commentsLoading,
    commentsError,
    toggleComments,
    retryLoadingComments: loadComments,
    replyToComment,
    addComment,
  };
};
