import { useEffect, useMemo, useState } from 'react';
import Layout from '@/components/layouts/Layout';
import Title from '@/components/common/Title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SearchAndFilters from '@/components/common/SearchAndFilters';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { api } from '@/services/api';
import Loading from '@/components/common/Loading';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | string;
  createdAt?: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [rolesDraft, setRolesDraft] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await api.get('/auth/users');
        setUsers(res.data.items ?? res.data ?? []);
      } catch {
        toast.error('Falha ao carregar usuários');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleSearch = async (query: string) => {
    try {
      const url = query
        ? `/auth/users/search?q=${encodeURIComponent(query)}`
        : `/auth/users`;
      const res = await api.get(url);
      setUsers(res.data.items ?? res.data ?? []);
    } catch {
      toast.error('Erro na busca de usuários');
    }
  };

  const rows = useMemo(() => {
    return users.map((u) => (
      <tr key={u._id} className="border-b hover:bg-muted/50 transition-colors">
        <td className="py-3 px-4 font-medium">{u.name ?? '-'}</td>
        <td className="py-3 px-4">{u.email}</td>
        <td className="py-3 px-4">{u.role ?? 'user'}</td>
        <td className="py-3 px-4">
          <Select
            value={rolesDraft[u._id] ?? u.role ?? 'user'}
            onValueChange={(val) =>
              setRolesDraft((prev) => ({ ...prev, [u._id]: val }))
            }
          >
            <SelectTrigger size="sm" className="min-w-40">
              <SelectValue placeholder="Selecionar papel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">Usuário</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </td>
        <td className="py-3 px-4">
          <Button
            size="sm"
            variant="default"
            onClick={async () => {
              const newRole = rolesDraft[u._id] ?? u.role ?? 'user';
              try {
                await api.patch(`/auth/users/${u._id}/role`, { role: newRole });
                setUsers((prev) =>
                  prev.map((usr) =>
                    usr._id === u._id ? { ...usr, role: newRole } : usr
                  )
                );
                toast.success('Permissão atualizada');
              } catch {
                toast.error('Falha ao atualizar permissão');
              }
            }}
          >
            Salvar
          </Button>
        </td>
      </tr>
    ));
  }, [users, rolesDraft]);

  if (loading) return <Loading />;

  return (
    <Layout>
      <div className="space-y-6">
        <Title
          title="Administração"
          subtitle="Gerencie permissão dos usuários do sistema"
        />

        <SearchAndFilters
          placeholder="Buscar usuários por nome ou email..."
          btnText={Search}
          onSearch={handleSearch}
        />

        <Card>
          <CardHeader>
            <CardTitle>Usuários</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Nome</th>
                    <th className="text-left py-3 px-4 font-medium">Email</th>
                    <th className="text-left py-3 px-4 font-medium">
                      Papel atual
                    </th>
                    <th className="text-left py-3 px-4 font-medium">
                      Novo papel
                    </th>
                    <th className="text-left py-3 px-4 font-medium">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.length > 0 ? (
                    rows
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-6 text-muted-foreground"
                      >
                        Nenhum usuário encontrado
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      <Toaster richColors />
    </Layout>
  );
}
