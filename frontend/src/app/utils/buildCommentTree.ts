import { PostCommentType } from '@/app/types/communities';
import { ThreadedComment } from '@/app/user/community/components/CommentThread';

export const buildCommentTree = (
  comments: PostCommentType[],
): ThreadedComment[] => {
  const commentsById = new Map<number, ThreadedComment>();
  const roots: ThreadedComment[] = [];

  comments.forEach((comment) => {
    commentsById.set(comment.id, { ...comment, replies: [] });
  });

  comments.forEach((comment) => {
    const node = commentsById.get(comment.id);
    if (!node) return;

    const parent =
      comment.parent_comment_id === null
        ? undefined
        : commentsById.get(comment.parent_comment_id);

    if (parent) {
      parent.replies.push(node);
    } else {
      roots.push(node);
    }
  });

  return roots;
};
