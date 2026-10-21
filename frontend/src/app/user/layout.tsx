'use client';

import { PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthStatus, useAuthContext } from '@/context/AuthProvider';

export default function AuthenticatedUserLayout({
  children,
}: PropsWithChildren) {
  const router = useRouter();
  const { status, authError, retrySession } = useAuthContext();

  useEffect(() => {
    if (status === AuthStatus.Unauthenticated) {
      router.replace('/login');
    }
  }, [router, status]);

  if (status === AuthStatus.Authenticated) {
    return children;
  }

  if (status === AuthStatus.Error) {
    return (
      <main className="grid min-h-[50vh] place-items-center p-6 text-center">
        <div className="space-y-4">
          <p role="alert">
            No pudimos comprobar tu sesión. {authError}
          </p>
          <button
            type="button"
            onClick={retrySession}
            className="rounded-md bg-greenIn px-4 py-2 font-semibold text-black"
          >
            Reintentar
          </button>
        </div>
      </main>
    );
  }

  return (
    <main
      className="grid min-h-[50vh] place-items-center"
      aria-live="polite"
    >
      <p>{status === AuthStatus.Unauthenticated ? 'Redirigiendo...' : 'Comprobando sesión...'}</p>
    </main>
  );
}
