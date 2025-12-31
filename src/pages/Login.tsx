import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Mail } from 'lucide-react';
import Logo from '@/components/common/Logo';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/context/useAuth';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from =
    (location.state as { from?: { pathname?: string } })?.from?.pathname ??
    '/dashboard';
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevenir propagação do evento

    // Validação básica antes de tentar login
    if (!email.trim() || !password.trim()) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      toast.success('Login realizado com sucesso!');
      // Usar navigate em vez de window.location para evitar recarregamento
      navigate(from, { replace: true });
    } catch (err: unknown) {
      // Extrair mensagem de erro de forma mais robusta
      let errorMessage = 'Erro ao realizar login. Tente novamente mais tarde.';

      if (err && typeof err === 'object') {
        // Verificar se é um erro do Axios
        if ('response' in err) {
          const apiError = err as {
            response?: {
              data?: {
                message?: string | string[];
              };
              status?: number;
            };
          };

          if (apiError.response?.data?.message) {
            const msg = apiError.response.data.message;
            errorMessage = Array.isArray(msg) ? msg.join(', ') : msg;
          } else if (apiError.response?.status === 401) {
            errorMessage =
              'Credenciais inválidas. Verifique seu email e senha.';
          } else if (apiError.response?.status === 429) {
            errorMessage =
              'Muitas tentativas. Aguarde um momento e tente novamente.';
          }
        } else if ('message' in err && typeof err.message === 'string') {
          errorMessage = err.message;
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      toast.error(errorMessage);
      // Não limpar os campos para permitir correção fácil
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4 bg-background">
      <Card className="w-full max-w-md shadow-glow">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto">
            <Logo size="lg" className="rounded-2xl shadow-glow" />
          </div>
          <CardTitle className="text-2xl font-bold">VISO-BASS</CardTitle>
          <CardDescription>
            Sistema de Persistência de Dados para Social IoT
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Não tem uma conta? </span>
            <Link
              to="/register"
              className="hover:underline font-medium text-primary"
            >
              Registre-se
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
