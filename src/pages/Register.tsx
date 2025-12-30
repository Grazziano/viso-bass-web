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
import { Lock, Mail, User } from 'lucide-react';
import Logo from '@/components/common/Logo';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authService } from '@/services/authService';
import { AxiosError } from 'axios';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string>('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const isStrong = (() => {
        const minLen = 8;
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasDigit = /\d/.test(password);
        const hasSpecial = /[^A-Za-z0-9]/.test(password);
        const common = [
          '123456',
          '12345678',
          '123456789',
          'password',
          'qwerty',
          'abc123',
          'senha',
          'admin',
          '000000',
          '111111',
          'letmein',
        ];
        const normalized = password.toLowerCase();
        const hasCommon = common.includes(normalized);
        const hasRepeat = /^([a-zA-Z0-9])\1{3,}$/.test(password);
        const nameNorm = name.toLowerCase().replace(/\s+/g, '');
        const emailLocal = email.toLowerCase().split('@')[0] ?? '';
        const containsPII =
          (nameNorm && nameNorm.length >= 3 && normalized.includes(nameNorm)) ||
          (emailLocal &&
            emailLocal.length >= 3 &&
            normalized.includes(emailLocal));
        return (
          password.length >= minLen &&
          hasUpper &&
          hasLower &&
          hasDigit &&
          hasSpecial &&
          !hasCommon &&
          !hasRepeat &&
          !containsPII
        );
      })();

      if (email && password && name && isStrong) {
        await authService.register({ name, email, password });
        toast.success('Conta criada com sucesso!');
        navigate('/login');
      } else {
        setPasswordError(
          'Senha fraca. Use no mínimo 8 caracteres com maiúsculas, minúsculas, números e símbolo; evite dados pessoais e sequências.'
        );
        toast.error('Por favor, verifique os requisitos da senha');
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || 'Erro ao registrar usuário');
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Erro ao registrar usuário');
      }
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
          <CardTitle className="text-2xl font-bold">Criar Conta</CardTitle>
          <CardDescription>
            Registre-se para acessar o VISO-BASS
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  className="pl-10"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
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
                  minLength={8}
                />
              </div>
              {passwordError && (
                <p className="text-xs text-destructive">{passwordError}</p>
              )}
              <ul className="text-xs text-muted-foreground list-disc pl-5 space-y-1">
                <li>Mínimo de 8 caracteres</li>
                <li>Inclua maiúsculas, minúsculas, números e símbolo</li>
                <li>Não use seu nome ou email</li>
                <li>Evite sequências e repetições (ex.: 1111, 1234)</li>
              </ul>
            </div>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={loading}
            >
              {loading ? 'Criando conta...' : 'Registrar'}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Já tem uma conta? </span>
            <Link
              to="/login"
              className="text-primary hover:underline font-medium"
            >
              Faça login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
