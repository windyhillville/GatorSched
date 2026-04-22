import { createContext, PropsWithChildren, useContext, useState } from 'react';

type AuthState = {
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
};

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  logIn: () => {},
  logOut: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logIn = () => {
    setIsLoggedIn(true);
  };

  const logOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>{children}</AuthContext.Provider>
  );
}
