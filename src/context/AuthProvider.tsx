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
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Buscar informações do usuário apenas uma vez
      if (!userLoaded) {
        api
          .get('/auth/me')
          .then((response) => {
            setUser({
              email: response.data.email || '',
              name: response.data.name || '',
              role: response.data.role || 'user',
            });
            setUserLoaded(true);
          })
          .catch(() => {
            // Se falhar, marcar como carregado para não tentar novamente
            setUserLoaded(true);
          });
      }
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [token, userLoaded]);

  const login = async (email: string, password: string) => {
    try {
      const data = await authService.login({ email, password });
      const newToken = data.access_token as string;
      localStorage.setItem('token', newToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      setToken(newToken);

      // Tentar buscar informações do usuário
      try {
        const userData = await api.get('/auth/me');
        setUser({
          email: userData.data.email || email,
          name: userData.data.name,
          role: userData.data.role || 'user',
        });
        setUserLoaded(true);
      } catch {
        // Se não conseguir buscar, usar apenas o email
        setUser({ email, role: 'user' });
        setUserLoaded(true);
      }
    } catch (error) {
      // Re-lançar o erro para que o componente possa tratá-lo
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
    setUserLoaded(false);
  };

  const value: AuthContextValue = useMemo(
    () => ({
      token,
      isAuthenticated: !!token,
      user,
      login,
      logout,
      updateUser: (partial) =>
        setUser((prev) => ({
          ...(prev ?? { email: '', role: 'user' }),
          ...partial,
        })),
    }),
    [token, user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
