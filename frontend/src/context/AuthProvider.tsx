'use client';

import {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
  useEffect,
} from 'react';

import Cookies from 'js-cookie';

export enum AuthStatus {
  Checking = 'checking',
  Authenticated = 'authenticated',
  Unauthenticated = 'unauthenticated',
}

interface User {
  name: string;
  email: string;
}

interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;
  isChecking: boolean;
  isAuthenticated: boolean;
  loginWithEmailPassword: (email: string, password: string) => void;
  logout: () => void;
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

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [status, setStatus] = useState<AuthStatus>(AuthStatus.Checking);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);

  const loginWithEmailPassword = (email: string, password: string) => {
    console.log('Iniciando sesión para:', email);
    console.log('Password (solo desarrollo):', password);

    setUser({
      name: 'Lautaro',
      email: email,
    });
    setStatus(AuthStatus.Authenticated);
  };

  const logout = () => {
    setUser(undefined);
    setToken(undefined);
    setStatus(AuthStatus.Unauthenticated);
  };

  useEffect(() => {
    const verificarSesionAnterior = async () => {
      const token = Cookies.get('authToken');

      if (!token) {
        setStatus(AuthStatus.Unauthenticated);
        return;
      }

      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const userId = decodedToken.id;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}auth/${userId}`,
        );

        if (!response.ok) throw new Error();

        const data = await response.json();

        setToken(token);
        setUser(data);
        setStatus(AuthStatus.Authenticated);
      } catch (error) {
        logout();
      }
    };

    verificarSesionAnterior();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        status,
        token,
        user,
        isChecking: status === AuthStatus.Checking,
        isAuthenticated: status === AuthStatus.Authenticated,
        loginWithEmailPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
