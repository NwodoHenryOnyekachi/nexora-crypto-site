import { createContext, useContext, useState, ReactNode } from 'react';

export type AuthMode = 'login' | 'register';

interface AuthModalContextValue {
  isOpen: boolean;
  mode: AuthMode;
  redirectTo: string;
  openModal: (mode?: AuthMode, redirectTo?: string) => void;
  closeModal: () => void;
  setMode: (mode: AuthMode) => void;
}

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>('login');
  const [redirectTo, setRedirectTo] = useState('/dashboard');

  const openModal = (nextMode: AuthMode = 'login', nextRedirect: string = '/dashboard') => {
    setMode(nextMode);
    setRedirectTo(nextRedirect);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <AuthModalContext.Provider value={{ isOpen, mode, redirectTo, openModal, closeModal, setMode }}>
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error('useAuthModal must be used within an AuthModalProvider');
  return ctx;
}
