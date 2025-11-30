import { useEffect, useMemo, useState } from 'react';
import Title from '@/components/common/Title';
import Layout from '@/components/layouts/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Loader2, Plus, Search } from 'lucide-react';
import { api } from '@/services/api';
import type { IObject } from '@/types/objects';

export default function Objects() {
  const [objects, setObjects] = useState<IObject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchObjects = async () => {
      const response = await api.get('/object');
      setObjects(response.data);
      setLoading(false);
    };

    fetchObjects();
  }, []);

  const rows = useMemo(() => {
    return objects.slice(0, 5).map((obj) => (
      <tr
        key={obj._id}
        className="border-b hover:bg-muted/50 transition-colors"
      >
        <td className="py-3 px-4 font-medium">{obj.obj_name}</td>
        <td className="py-3 px-4">
          <Badge variant="outline">{obj.obj_brand}</Badge>
        </td>
        <td className="py-3 px-4">{obj.obj_model}</td>
        <td className="py-3 px-4">
          <Badge
            variant={obj.obj_status === 1 ? 'default' : 'secondary'}
            className={cn(
              obj.obj_status === 1
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            )}
          >
            {obj.obj_status === 1 ? 'Ativo' : 'Inativo'}
          </Badge>
        </td>
        {/* <td className="py-3 px-4">
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm">
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </td> */}
      </tr>
    ));
  }, [objects]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Title
            title="Objetos IoT"
            subtitle="Gerencie os objetos cadastrados no sistema"
          />

          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Novo Objeto
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar objetos..." className="pl-10" />
              </div>
              <Button variant="outline">Filtros</Button>
            </div>
          </CardContent>
        </Card>

        {/* Objects Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Objetos ({objects.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Nome</th>
                    <th className="text-left py-3 px-4 font-medium">Marca</th>
                    <th className="text-left py-3 px-4 font-medium">Modelo</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    {/* <th className="text-right py-3 px-4 font-medium">Ações</th> */}
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
                        Nenhum objeto encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
