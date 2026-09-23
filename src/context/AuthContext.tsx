import { createContext, useContext, useState, ReactNode } from 'react';

export type KycStatus = 'verified' | 'pending' | 'unverified';

export interface AuthUser {
  name: string;
  email: string;
  plan: string;
  emailVerified: boolean;
  kycStatus: KycStatus;
}

interface AuthContextValue {
  isLoggedIn: boolean;
  user: AuthUser;
  login: () => void;
  logout: () => void;
}

const defaultUser: AuthUser = {
  name: 'Stephen W.',
  email: 'stephen@nexora.io',
  plan: 'Pro Plan',
  emailVerified: true,
  kycStatus: 'pending',
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user: defaultUser,
        login: () => setIsLoggedIn(true),
        logout: () => setIsLoggedIn(false),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
