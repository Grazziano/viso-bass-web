import { createContext } from 'react';

export interface AuthUser {
  email: string;
  name?: string;
  role: string | null;
}

export interface AuthContextValue {
  token: string | null;
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);
