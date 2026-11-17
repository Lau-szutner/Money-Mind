'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { PostType } from '@/app/types/communities';
import { PostActions } from '@/app/user/community/components/PostActions';
import { CommentSection } from '@/app/user/community/components/CommentSection';
import { usePostComments } from '@/app/user/community/hooks/usePostComments';
import { usePostVote } from '@/app/user/community/hooks/usePostVote';
import { useAuthContext } from '@/context/AuthProvider';
import { deletePost, updatePost } from '@/app/services/postsService';

interface PostProps extends PostType {
  onVoteChange?: (
    postId: number,
    voteScore: number,
    userVote: 'up' | null,
  ) => void;
  onPostUpdated?: (postId: number, title: string, body: string) => void;
  onPostDeleted: (postId: number) => void;
  isDetailPage?: boolean;
}

const Post = ({
  id,
  authorId,
  title,
  body,
  createdAt,
  community,
  voteScore = 0,
  commentCount = 0,
  userVote = null,
  onVoteChange,
  onPostUpdated,
  onPostDeleted,
  isDetailPage = false,
}: PostProps) => {
  const { user: currentUser } = useAuthContext();
  const router = useRouter();
  const [postTitle, setPostTitle] = useState(title);
  const [postBody, setPostBody] = useState(body);
  const [editing, setEditing] = useState(false);
  const [postActionLoading, setPostActionLoading] = useState(false);
  const [postActionError, setPostActionError] = useState<string | null>(null);
  const { score, currentVote, voteLoading, voteError, handleUpvote } =
    usePostVote({
      postId: id,
      initialVoteScore: voteScore,
      initialUserVote: userVote,
      onVoteChange,
    });

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
  const isAuthor = currentUser?.id === authorId;

  const handleSaveEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = postTitle.trim();
    if (!trimmedTitle || postActionLoading) return;

    setPostActionLoading(true);
    setPostActionError(null);
    try {
      await updatePost(id, { title: trimmedTitle, body: postBody });
      setPostTitle(trimmedTitle);
      setEditing(false);
      onPostUpdated?.(id, trimmedTitle, postBody);
    } catch (error) {
      setPostActionError(
        error instanceof Error ? error.message : 'No se pudo editar el post',
      );
    } finally {
      setPostActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (
      !isAuthor ||
      postActionLoading ||
      !window.confirm('¿Seguro que quieres eliminar esta publicación?')
    ) {
      return;
    }

    setPostActionLoading(true);
    setPostActionError(null);
    try {
      await deletePost(id);
      onPostDeleted?.(id);
    } catch (error) {
      setPostActionError(
        error instanceof Error ? error.message : 'No se pudo eliminar el post',
      );
    } finally {
      setPostActionLoading(false);
    }
  };

  const cancelEdit = () => {
    setPostTitle(title);
    setPostBody(body);
    setPostActionError(null);
    setEditing(false);
  };

  const postHref = `/user/community/${encodeURIComponent(community.slug)}/post/${id}`;

  const postContent = (
    <article
      onClick={(event) => {
        if (isDetailPage) return;
        const target = event.target;
        if (
          target instanceof Element &&
          target.closest('a, button, input, textarea, select, summary')
        ) {
          return;
        }
        router.push(postHref);
      }}
      className={`border-t border-gray-600 p-5  ${
        isDetailPage ? '' : 'hover:bg-background'
      }`}
    >
      <header className="flex flex-wrap items-center gap-3 text-sm">
        {isDetailPage ? (
          <div className="flex items-center gap-3">
            <Link
              className="text-greenIn"
              href={`/user/community/${encodeURIComponent(community.slug)}`}
            >
              /{community.name}
            </Link>
            <span aria-hidden="true">•</span>
            <p className="font-light">{createdAt}</p>
          </div>
        ) : (
          <Link
            href={postHref}
            className="flex items-center gap-3 hover:underline"
          >
            <p className="text-greenIn">/{community.name}</p>
            <span aria-hidden="true">•</span>
            <p className="font-light">{createdAt}</p>
          </Link>
        )}
        <div className="ml-auto flex items-center gap-2">
          {isAuthor && !editing && (
            <details className="relative">
              <summary
                aria-label="Opciones de la publicación"
                title="Opciones de la publicación"
                className="list-none cursor-pointer rounded-full p-2 text-gray-300 hover:bg-neutral-700 hover:text-white [&::-webkit-details-marker]:hidden"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-5 w-5 fill-current"
                >
                  <circle cx="12" cy="5" r="1.8" />
                  <circle cx="12" cy="12" r="1.8" />
                  <circle cx="12" cy="19" r="1.8" />
                </svg>
              </summary>
              <div className="absolute right-0 z-10 mt-1 min-w-36 overflow-hidden rounded-md border border-gray-600 bg-neutral-900 py-1 shadow-lg">
                <button
                  type="button"
                  onClick={(event) => {
                    event.currentTarget
                      .closest('details')
                      ?.removeAttribute('open');
                    setEditing(true);
                  }}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-neutral-700"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.currentTarget
                      .closest('details')
                      ?.removeAttribute('open');
                    void handleDelete();
                  }}
                  disabled={postActionLoading}
                  className="block w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-neutral-700 disabled:opacity-50"
                >
                  {postActionLoading ? 'Eliminando...' : 'Eliminar'}
                </button>
              </div>
            </details>
          )}
        </div>
      </header>
      {editing ? (
        <form onSubmit={handleSaveEdit} className="space-y-3 py-5">
          <label className="block space-y-1">
            <span className="text-sm font-semibold">Título</span>
            <input
              value={postTitle}
              onChange={(event) => setPostTitle(event.target.value)}
              maxLength={300}
              required
              disabled={postActionLoading}
              className="w-full rounded-md bg-neutral-900 p-3 text-white"
            />
          </label>
          <label className="block space-y-1">
            <span className="text-sm font-semibold">Contenido</span>
            <textarea
              value={postBody}
              onChange={(event) => setPostBody(event.target.value)}
              rows={5}
              disabled={postActionLoading}
              className="w-full rounded-md bg-neutral-900 p-3 text-white"
            />
          </label>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={!postTitle.trim() || postActionLoading}
              className="rounded-md bg-greenIn px-4 py-2 font-semibold text-black disabled:opacity-50"
            >
              {postActionLoading ? 'Guardando...' : 'Guardar'}
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              disabled={postActionLoading}
              className="rounded-md bg-neutral-700 px-4 py-2 disabled:opacity-50"
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-5 py-5">
          {isDetailPage ? (
            <h2 className="text-xl font-bold">{postTitle}</h2>
          ) : (
            <Link href={postHref} className="text-xl font-bold">
              {postTitle}
            </Link>
          )}
          <div className="wrap-break-words">
            <ReactMarkdown>{postBody}</ReactMarkdown>
          </div>
        </div>
      )}

      {postActionError && (
        <p role="alert" className="mb-3 text-sm text-red-400">
          {postActionError}
        </p>
      )}

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
          onClose={toggleComments}
        />
      )}
    </article>
  );

  return postContent;
};

export default Post;
