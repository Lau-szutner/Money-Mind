'use client';

import {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

import Cookies from 'js-cookie';

export enum AuthStatus {
  Checking = 'checking',
  Authenticated = 'authenticated',
  Unauthenticated = 'unauthenticated',
  Error = 'error',
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;
  authError?: string;
  isChecking: boolean;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  retrySession: () => void;
}

export const AuthContext = createContext<AuthState | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      'useAuthContext debe ser utilizado dentro de un AuthProvider',
    );
  }
  return context;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [status, setStatus] = useState<AuthStatus>(AuthStatus.Checking);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [authError, setAuthError] = useState<string | undefined>(undefined);

  const login = (authToken: string, authUser: User) => {
    Cookies.set('authToken', authToken, {
      expires: 1,
      secure: window.location.protocol === 'https:',
      sameSite: 'Lax',
    });
    setToken(authToken);
    setUser(authUser);
    setAuthError(undefined);
    setStatus(AuthStatus.Authenticated);
  };

  const logout = () => {
    Cookies.remove('authToken');
    setUser(undefined);
    setToken(undefined);
    setAuthError(undefined);
    setStatus(AuthStatus.Unauthenticated);
  };

  const validateSession = useCallback(async (signal?: AbortSignal) => {
    setStatus(AuthStatus.Checking);
    setAuthError(undefined);

    const authToken = Cookies.get('authToken');
    if (!authToken) {
      setUser(undefined);
      setToken(undefined);
      setStatus(AuthStatus.Unauthenticated);
      return;
    }

    setToken(authToken);

    try {
      const response = await fetch(`${apiUrl.replace(/\/+$/, '')}/auth/me`, {
        headers: { Authorization: `Bearer ${authToken}` },
        signal,
      });

      if (
        response.status === 401 ||
        response.status === 403 ||
        response.status === 404
      ) {
        Cookies.remove('authToken');
        setUser(undefined);
        setToken(undefined);
        setStatus(AuthStatus.Unauthenticated);
        return;
      }

      if (!response.ok) {
        throw new Error(`No se pudo validar la sesión (${response.status}).`);
      }

      const currentUser: User = await response.json();
      if (
        typeof currentUser.id !== 'number' ||
        typeof currentUser.name !== 'string' ||
        typeof currentUser.email !== 'string'
      ) {
        throw new Error('El servidor devolvió datos de usuario inválidos.');
      }

      setUser(currentUser);
      setStatus(AuthStatus.Authenticated);
    } catch (error) {
      if (signal?.aborted) return;

      console.error('Error al validar la sesión:', error);
      setAuthError(
        error instanceof Error
          ? error.message
          : 'No se pudo validar la sesión. Comprueba tu conexión.',
      );
      setStatus(AuthStatus.Error);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    validateSession(controller.signal);
    return () => controller.abort();
  }, [validateSession]);

  return (
    <AuthContext.Provider
      value={{
        status,
        token,
        user,
        authError,
        isChecking: status === AuthStatus.Checking,
        isAuthenticated: status === AuthStatus.Authenticated,
        login,
        logout,
        retrySession: () => validateSession(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
