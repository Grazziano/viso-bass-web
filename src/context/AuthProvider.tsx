import { useEffect, useMemo, useState } from 'react';
import {
  AuthContext,
  type AuthContextValue,
  type AuthUser,
} from './auth-context';
import { authService } from '@/services/authService';
import { api } from '@/services/api';

interface Props {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('token')
  );
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    const data = await authService.login({ email, password });
    const newToken = data.access_token as string;
    localStorage.setItem('token', newToken);
    api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    setToken(newToken);
    setUser({ email });
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
  };

  const value: AuthContextValue = useMemo(
    () => ({ token, isAuthenticated: !!token, user, login, logout }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
