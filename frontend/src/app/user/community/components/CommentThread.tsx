import { useState } from 'react';
import { PostCommentType } from '@/app/types/communities';
import { formatDate } from '@/app/utils/formatters';
import { CommentComposer } from '@/app/user/community/components/CommentComposer';

export interface ThreadedComment extends PostCommentType {
  replies: ThreadedComment[];
}

interface CommentThreadProps {
  comment: ThreadedComment;
  depth: number;
  onReply: (parentCommentId: number, body: string) => Promise<void>;
}

export const CommentThread = ({
  comment,
  depth,
  onReply,
}: CommentThreadProps) => {
  const [replying, setReplying] = useState(false);

  const handleReply = async (body: string) => {
    await onReply(comment.id, body);
    setReplying(false);
  };

  return (
    <li
      className="border-l border-neutral-700 pl-3"
      style={{ marginInlineStart: `${Math.min(depth, 6) * 12}px` }}
    >
      <div className="rounded-lg bg-neutral-800 p-3">
        <div className="mb-1 flex flex-wrap items-center gap-2 text-xs text-gray-400">
          <span className="font-semibold text-greenIn">
            {comment.User.name}
          </span>
          <span>{formatDate(comment.createdAt)}</span>
        </div>
        <p className="whitespace-pre-wrap wrap-break-words text-sm">
          {comment.body}
        </p>
        <button
          type="button"
          onClick={() => setReplying((current) => !current)}
          aria-expanded={replying}
          className="mt-2 text-xs font-semibold text-greenIn hover:underline"
        >
          {replying ? 'Cancelar respuesta' : 'Responder'}
        </button>
        {replying && (
          <div className="mt-3">
            <CommentComposer
              placeholder={`Responder a ${comment.User.name}...`}
              buttonLabel="Responder"
              onSubmit={handleReply}
            />
          </div>
        )}
      </div>

      {comment.replies.length > 0 && (
        <ul className="mt-3 space-y-3">
          {comment.replies.map((reply) => (
            <CommentThread
              key={reply.id}
              comment={reply}
              depth={depth + 1}
              onReply={onReply}
            />
          ))}
        </ul>
      )}
    </li>
  );
};
