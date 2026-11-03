import { CommentComposer } from '@/app/user/community/components/CommentComposer';
import {
  CommentThread,
  ThreadedComment,
} from '@/app/user/community/components/CommentThread';

interface CommentSectionProps {
  comments: ThreadedComment[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  onReply: (parentCommentId: number, body: string) => Promise<void>;
  onComment: (body: string) => Promise<void>;
  onCancel: () => void;
}

export const CommentSection = ({
  comments,
  loading,
  error,
  onRetry,
  onReply,
  onComment,
  onCancel,
}: CommentSectionProps) => (
  <section className="mt-5 border-t border-neutral-700 pt-4">
    <h3 className="mb-3 font-semibold">Comentarios</h3>
    {loading ? (
      <p className="text-sm text-gray-400">Cargando comentarios...</p>
    ) : error ? (
      <div className="mb-4 space-y-2">
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="text-sm font-semibold text-greenIn hover:underline"
        >
          Reintentar
        </button>
      </div>
    ) : comments.length === 0 ? (
      <p className="mb-4 text-sm text-gray-400">
        Todavía no hay comentarios. ¡Sé el primero!
      </p>
    ) : (
      <ul className="mb-4 space-y-3">
        {comments.map((comment) => (
          <CommentThread
            key={comment.id}
            comment={comment}
            depth={0}
            onReply={onReply}
          />
        ))}
      </ul>
    )}

    <CommentComposer
      placeholder="Escribe un comentario..."
      buttonLabel="Comentar"
      onSubmit={onComment}
      onCancel={onCancel}
    />
  </section>
);
