'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getPostByIdAndSlug } from '@/app/services/postsService';
import { PostType } from '@/app/types/communities';
import Post from '@/app/user/community/components/Post';
import { formatDate } from '@/app/utils/formatters';

export default function PostPage({
  params,
}: {
  params: Promise<{ slug: string; postId: string }>;
}) {
  const { slug, postId: postIdParam } = use(params);
  const router = useRouter();
  const postId = Number(postIdParam);
  const [post, setPost] = useState<PostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadRetry, setLoadRetry] = useState(0);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadPost = async () => {
      setLoading(true);
      setLoadError(null);
      setPost(null);

      if (!Number.isSafeInteger(postId) || postId <= 0) {
        setLoadError('El identificador de la publicación no es válido');
        setLoading(false);
        return;
      }

      try {
        const data = await getPostByIdAndSlug(slug, postId);
        if (cancelled) return;
        if (
          data.id !== postId ||
          !data.User ||
          !data.Community ||
          typeof data.title !== 'string' ||
          typeof data.body !== 'string'
        ) {
          throw new Error('El servidor devolvió una publicación inválida');
        }

        setPost({
          id: data.id,
          authorId: data.User.id,
          user: data.User.name,
          community: data.Community,
          title: data.title,
          body: data.body,
          createdAt: data.createdAt ? formatDate(data.createdAt) : '00/00/0000',
          voteScore: data.voteScore,
          commentCount: data.commentCount,
          userVote: data.userVote,
        });
      } catch (error) {
        if (!cancelled) {
          setLoadError(
            error instanceof Error
              ? error.message
              : 'No se pudo cargar la publicación',
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void loadPost();
    return () => {
      cancelled = true;
    };
  }, [slug, postId, loadRetry]);

  return (
    <main className="min-w-0">
      <button
        type="button"
        onClick={() => router.back()}
        className="mb-5 inline-flex cursor-pointer text-greenIn hover:underline"
      >
        ← Volver
      </button>

      {loading ? (
        <p role="status" aria-live="polite">
          Cargando publicación...
        </p>
      ) : loadError ? (
        <section className="rounded-xl bg-bgComponents p-6">
          <p role="alert" className="text-red-400">
            {loadError}
          </p>
          <button
            type="button"
            onClick={() => setLoadRetry((current) => current + 1)}
            className="mt-4 rounded-md bg-greenIn px-4 py-2 font-semibold text-black hover:opacity-90"
          >
            Reintentar
          </button>
        </section>
      ) : post ? (
        <div className="rounded-xl bg-bgComponents p-5">
          <Post
            {...post}
            isDetailPage
            onPostUpdated={(updatedPostId, title, body) =>
              setPost((current) =>
                current?.id === updatedPostId
                  ? { ...current, title, body }
                  : current,
              )
            }
            onVoteChange={(updatedPostId, voteScore, userVote) =>
              setPost((current) =>
                current?.id === updatedPostId
                  ? { ...current, voteScore, userVote }
                  : current,
              )
            }
            onPostDeleted={() =>
              router.replace(`/user/community/${encodeURIComponent(slug)}`)
            }
          />
        </div>
      ) : (
        <p role="status">No se encontró la publicación solicitada.</p>
      )}
    </main>
  );
}
