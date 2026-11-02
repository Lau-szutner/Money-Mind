'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import {
  createPostComment,
  getPostComments,
  togglePostUpvote,
} from '@/app/services/postsService';
import { formatDate } from '@/app/utils/formatters';
import {
  PostCommentType,
  PostType,
} from '@/app/types/communities';

interface PostProps extends PostType {
  onVoteChange?: (
    postId: number,
    voteScore: number,
    userVote: 'up' | null,
  ) => void;
}

interface ThreadedComment extends PostCommentType {
  replies: ThreadedComment[];
}

interface CommentComposerProps {
  placeholder: string;
  buttonLabel: string;
  onSubmit: (body: string) => Promise<void>;
}

const CommentComposer = ({
  placeholder,
  buttonLabel,
  onSubmit,
}: CommentComposerProps) => {
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedBody = body.trim();
    if (!trimmedBody || submitting) return;

    setSubmitting(true);
    setError(null);
    try {
      await onSubmit(trimmedBody);
      setBody('');
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'No se pudo publicar el comentario',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        value={body}
        onChange={(event) => setBody(event.target.value)}
        disabled={submitting}
        maxLength={2000}
        rows={3}
        placeholder={placeholder}
        className="w-full resize-y rounded-lg border border-neutral-700 bg-neutral-900 p-3 text-sm text-white placeholder-gray-400 focus:border-greenIn focus:outline-none"
      />
      {error && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs text-gray-400">{body.length}/2000</span>
        <button
          type="submit"
          disabled={!body.trim() || submitting}
          className="rounded-md bg-greenIn px-4 py-2 text-sm font-semibold text-black hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? 'Publicando...' : buttonLabel}
        </button>
      </div>
    </form>
  );
};

interface CommentThreadProps {
  comment: ThreadedComment;
  depth: number;
  onReply: (parentCommentId: number, body: string) => Promise<void>;
}

const CommentThread = ({ comment, depth, onReply }: CommentThreadProps) => {
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
          <span className="font-semibold text-greenIn">{comment.User.name}</span>
          <span>{formatDate(comment.createdAt)}</span>
        </div>
        <p className="whitespace-pre-wrap break-words text-sm">
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

const buildCommentTree = (comments: PostCommentType[]): ThreadedComment[] => {
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
  const [commentsCount, setCommentsCount] = useState(commentCount);
  const [comments, setComments] = useState<PostCommentType[]>([]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [voteLoading, setVoteLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const commentTree = buildCommentTree(comments);

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

  const handleToggleComments = async () => {
    const shouldOpen = !commentsOpen;
    setCommentsOpen(shouldOpen);
    if (!shouldOpen || commentsLoaded || commentsLoading) return;

    setCommentsLoading(true);
    setError(null);
    try {
      const data = await getPostComments(id);
      setComments(data);
      setCommentsLoaded(true);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'No se pudieron cargar los comentarios',
      );
    } finally {
      setCommentsLoading(false);
    }
  };

  const handleReply = async (parentCommentId: number, body: string) => {
    setError(null);
    const reply = await createPostComment(id, body, parentCommentId);
    setComments((current) => [...current, reply]);
    setCommentsCount((current) => current + 1);
    setCommentsLoaded(true);
  };

  return (
    <article className="border-t-[0.5px] p-5 hover:bg-background">
      <header className="flex flex-wrap items-center gap-3 text-sm">
        <p className="text-greenIn">/{community.name}</p>
        <span aria-hidden="true">•</span>
        <p className="font-light">{createdAt}</p>
        <p className="ml-auto">{user}</p>
      </header>

      <div className="flex flex-col gap-5 py-5">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="break-words">
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex w-fit items-center gap-2 rounded-lg bg-[#323232] p-1">
          <button
            type="button"
            onClick={handleUpvote}
            disabled={voteLoading}
            aria-label={
              currentVote === 'up' ? 'Quitar upvote' : 'Dar upvote'
            }
            aria-pressed={currentVote === 'up'}
            className={`flex items-center gap-1 rounded px-1 transition hover:text-greenIn disabled:opacity-50 ${
              currentVote === 'up' ? 'text-greenIn' : 'text-white'
            }`}
          >
            <Image
              src="/icons/arrow_circle_up.svg"
              alt=""
              width={26}
              height={26}
            />
            <span>{score}</span>
          </button>
        </div>

        <button
          type="button"
          onClick={handleToggleComments}
          aria-expanded={commentsOpen}
          className="flex items-center gap-2 rounded-lg bg-[#323232] p-2 text-sm hover:text-greenIn"
        >
          <Image
            src="/icons/comments.svg"
            alt=""
            width={24}
            height={24}
          />
          <span>
            {commentsCount} {commentsCount === 1 ? 'comentario' : 'comentarios'}
          </span>
        </button>
      </div>

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-400">
          {error}
        </p>
      )}

      {commentsOpen && (
        <section className="mt-5 border-t border-neutral-700 pt-4">
          <h3 className="mb-3 font-semibold">Comentarios</h3>
          {commentsLoading ? (
            <p className="text-sm text-gray-400">Cargando comentarios...</p>
          ) : commentTree.length === 0 ? (
            <p className="mb-4 text-sm text-gray-400">
              Todavía no hay comentarios. ¡Sé el primero!
            </p>
          ) : (
            <ul className="mb-4 space-y-3">
              {commentTree.map((comment) => (
                <CommentThread
                  key={comment.id}
                  comment={comment}
                  depth={0}
                  onReply={handleReply}
                />
              ))}
            </ul>
          )}

          <CommentComposer
            placeholder="Escribe un comentario..."
            buttonLabel="Comentar"
            onSubmit={async (body) => {
              const comment = await createPostComment(id, body);
              setComments((current) => [...current, comment]);
              setCommentsCount((current) => current + 1);
              setCommentsLoaded(true);
              setCommentsOpen(true);
            }}
          />
        </section>
      )}
    </article>
  );
};

export default Post;
