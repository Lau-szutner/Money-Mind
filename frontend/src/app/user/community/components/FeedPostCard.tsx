'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { PostType } from '@/app/types/communities';
import { PostActions } from '@/app/user/community/components/PostActions';
import { usePostVote } from '@/app/user/community/hooks/usePostVote';

interface FeedPostCardProps {
  post: PostType;
  onVoteChange?: (
    postId: number,
    voteScore: number,
    userVote: 'up' | null,
  ) => void;
}

export default function FeedPostCard({
  post,
  onVoteChange,
}: FeedPostCardProps) {
  const router = useRouter();
  const postHref = `/user/community/${encodeURIComponent(post.community.slug)}/post/${post.id}`;
  const { score, currentVote, voteLoading, voteError, handleUpvote } =
    usePostVote({
      postId: post.id,
      initialVoteScore: post.voteScore,
      initialUserVote: post.userVote,
      onVoteChange,
    });

  return (
    <article
      onClick={(event) => {
        const target = event.target;
        if (
          target instanceof Element &&
          target.closest(
            'a, button, input, textarea, select, summary, [role="alert"]',
          )
        ) {
          return;
        }
        router.push(postHref);
      }}
      className="cursor-pointer border-t border-gray-600 p-5 hover:bg-background"
    >
      <header className="flex flex-wrap items-center gap-3 text-sm">
        <Link
          href={postHref}
          className="flex items-center gap-3 hover:underline"
        >
          <p className="text-greenIn">/{post.community.name}</p>
          <span aria-hidden="true">•</span>
          <p className="font-light">{post.createdAt}</p>
        </Link>
      </header>

      <div className="flex flex-col gap-5 py-5">
        <Link href={postHref} className="text-xl font-bold">
          {post.title}
        </Link>
        <div className="wrap-break-words">
          <ReactMarkdown>{post.body}</ReactMarkdown>
        </div>
      </div>

      <PostActions
        score={score}
        currentVote={currentVote}
        voteLoading={voteLoading}
        commentsCount={post.commentCount ?? 0}
        onUpvote={handleUpvote}
        commentsHref={postHref}
      />

      {voteError && (
        <p role="alert" className="mt-3 text-sm text-red-400">
          {voteError}
        </p>
      )}
    </article>
  );
}
