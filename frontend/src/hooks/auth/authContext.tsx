import { AccessLevel } from '@/services/auth/login';
import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

type AuthUser = {
  id: string;
  name: string;
  accessLevel: AccessLevel;
};

type AuthState = {
  isLoggedIn: boolean;
  accessToken: string | null;
  user: AuthUser | null;
  logIn: (auth: { accessToken: string; user: AuthUser }) => void;
  logOut: () => void;
};

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  accessToken: null,
  user: null,
  logIn: () => {},
  logOut: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  const logIn = (auth: { accessToken: string; user: AuthUser }) => {
    setAccessToken(auth.accessToken);
    setUser(auth.user);
  };

  const logOut = () => {
    setAccessToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      isLoggedIn: !!accessToken,
      accessToken,
      user,
      logIn,
      logOut,
    }),

    [accessToken, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
