import { useState, useEffect } from 'react';
import Layout from '@/components/layouts/Layout';
import Title from '@/components/common/Title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, User } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/useAuth';
import { authService } from '@/services/authService';

export default function Account() {
  const { user, isAuthenticated, updateUser } = useAuth();
  const [name, setName] = useState<string>(user?.name ?? '');
  const [email, setEmail] = useState<string>(user?.email ?? '');
  const [savingProfile, setSavingProfile] = useState(false);

  // Sincronizar estados quando o usuário for carregado
  useEffect(() => {
    if (user) {
      setName(user.name ?? '');
      setEmail(user.email ?? '');
    }
  }, [user]);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) return;

    // Verificar se há mudanças
    const payload: { name?: string; email?: string } = {};
    if (name && name.trim() !== user?.name?.trim()) {
      payload.name = name.trim();
    }
    if (email && email.trim() !== user?.email?.trim()) {
      payload.email = email.trim();
    }

    // Verificar se há pelo menos um campo para atualizar
    if (Object.keys(payload).length === 0) {
      toast.info('Nenhuma alteração detectada');
      return;
    }

    try {
      setSavingProfile(true);
      const updated = await authService.updateMe(payload);
      toast.success('Informações atualizadas com sucesso');
      // Atualizar o contexto com os dados retornados do servidor
      updateUser?.({
        name: updated?.name ?? name,
        email: updated?.email ?? email,
      });
      // Atualizar os estados locais também
      if (updated?.name) setName(updated.name);
      if (updated?.email) setEmail(updated.email);
    } catch (error: any) {
      // Extrair mensagem de erro de forma mais robusta
      let errorMessage = 'Falha ao atualizar perfil';

      if (error?.response?.data) {
        const data = error.response.data;
        if (Array.isArray(data.message)) {
          errorMessage = data.message.join(', ');
        } else if (typeof data.message === 'string') {
          errorMessage = data.message;
        } else if (data.error) {
          errorMessage = String(data.error);
        }
      } else if (error?.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setSavingProfile(false);
    }
  };

  const isStrong = (() => {
    const pwd = newPassword;
    const minLen = 8;
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasDigit = /\d/.test(pwd);
    const hasSpecial = /[^A-Za-z0-9]/.test(pwd);
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
    const normalized = pwd.toLowerCase();
    const hasCommon = common.includes(normalized);
    const hasRepeat = /^([a-zA-Z0-9])\1{3,}$/.test(pwd);
    const nameNorm = (name ?? '').toLowerCase().replace(/\s+/g, '');
    const emailLocal = (email ?? '').toLowerCase().split('@')[0] ?? '';
    const containsPII =
      (nameNorm && nameNorm.length >= 3 && normalized.includes(nameNorm)) ||
      (emailLocal && emailLocal.length >= 3 && normalized.includes(emailLocal));
    return (
      pwd.length >= minLen &&
      hasUpper &&
      hasLower &&
      hasDigit &&
      hasSpecial &&
      !hasCommon &&
      !hasRepeat &&
      !containsPII
    );
  })();

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) return;
    if (!currentPassword || !newPassword) {
      toast.error('Preencha as senhas');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Confirmação de senha não confere');
      return;
    }
    if (!isStrong) {
      toast.error('Senha fraca. Verifique os requisitos');
      return;
    }
    try {
      setSavingPassword(true);
      await authService.changePassword({
        currentPassword,
        newPassword,
      });
      toast.success('Senha atualizada');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch {
      toast.error('Falha ao atualizar senha');
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <Title
          title="Minha Conta"
          subtitle="Atualize suas informações e senha"
        />

        <Card>
          <CardHeader>
            <CardTitle>Informações do Perfil</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSaveProfile}>
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
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={savingProfile}
              >
                {savingProfile ? 'Salvando...' : 'Salvar alterações'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Atualizar Senha</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleChangePassword}>
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Senha atual</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="currentPassword"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">Nova senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                </div>
                <ul className="text-xs text-muted-foreground list-disc pl-5 space-y-1">
                  <li>Mínimo de 8 caracteres</li>
                  <li>Inclua maiúsculas, minúsculas, números e símbolo</li>
                  <li>Evite usar nome ou email</li>
                  <li>Evite sequências e repetições</li>
                </ul>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={savingPassword}
              >
                {savingPassword ? 'Atualizando...' : 'Atualizar senha'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
