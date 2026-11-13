'use client';

import { use, useEffect, useState } from 'react';
import Post from '@/app/user/community/components/Post';
import { getPostByIdAndSlug } from '@/app/services/postsService';

// Custom Hook que recibe la promesa de params y maneja la lógica
function usePostData(paramsPromise: Promise<{ slug: string; postId: string }>) {
  const { slug, postId } = use(paramsPromise);

  return { slug, postId };
}

export default function PostPage({
  params,
}: {
  params: Promise<{ slug: string; postId: string }>;
}) {
  useEffect(() => {
    const fetchPostData = async (slug: string, postId: number) => {
      try {
        const data = await getPostByIdAndSlug(slug, postId);
      } catch {
      } finally {
      }
    };

    fetchPostData('ahorro-inteligente', 4);
  }, []);
  // Consumes tu propio hook
  const { slug, postId } = usePostData(params);

  return <div>{/* <Post /> */}</div>;
}
