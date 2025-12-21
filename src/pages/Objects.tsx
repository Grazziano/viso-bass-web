import { useEffect, useMemo, useState, useRef } from 'react';
import Title from '@/components/common/Title';
import Layout from '@/components/layouts/Layout';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { api } from '@/services/api';
import type { IObject } from '@/types/objects';
import { AlertDialogDemo } from '@/components/objects/AlertDialogDemo';
import CreateObjectDialog from '@/components/objects/CreateObjectDialog';
import Loading from '@/components/common/Loading';
import SearchAndFilters from '@/components/common/SearchAndFilters';
import { Search } from 'lucide-react';
import { ChartPieLabel } from '@/components/charts/ChartPieLabel';
import { useCharts } from '@/context/useCharts';

export default function Objects() {
  const [objects, setObjects] = useState<IObject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // const [page, setPage] = useState<number>();
  // const [limit, setLimit] = useState<number>();
  const [total, setTotal] = useState<number>(0);
  const abortControllerRef = useRef<AbortController | null>(null);
  const { statusCounts } = useCharts();

  useEffect(() => {
    const fetchObjects = async () => {
      const response = await api.get('/object');
      setObjects(response.data.items);
      // setLimit(response.data.limit);
      // setPage(response.data.page);
      setTotal(response.data.total);
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
                ? 'bg-muted text-foreground'
                : 'bg-destructive/10 text-destructive'
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
        <td className="py-3 px-4">
          <AlertDialogDemo btnText="Exibir" obj={obj} />
        </td>
      </tr>
    ));
  }, [objects]);

  if (loading) {
    return <Loading />;
  }

  const handleSearch = async (query: string) => {
    // Cancel previous request if still pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();

    try {
      const url = query
        ? `/object/search?name=${encodeURIComponent(query)}`
        : '/object';
      const response = await api.get(url, {
        signal: abortControllerRef.current.signal,
      });
      setObjects(response.data.items || []);
      setTotal(response.data.total ?? response.data.items?.length ?? 0);
    } catch (error: unknown) {
      // Ignore abort errors (previous requests cancelled)
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Erro na busca:', error);
      }
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Title
            title="Objetos IoT"
            subtitle="Gerencie os objetos cadastrados no sistema"
          />

          <CreateObjectDialog
            onCreate={(obj) => {
              setObjects((prev) => [obj, ...prev]);
            }}
          />
        </div>

        {/* Status Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Status dos Objetos</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartPieLabel
              title="Status dos Objetos"
              description="Distribuição de ativos e inativos"
              data={statusCounts}
              colors={{
                online: 'var(--chart-5)',
                offline: 'var(--chart-4)',
                Manutenção: 'var(--destructive)',
                Desconhecido: 'var(--chart-3)',
              }}
              className="w-full h-96"
            />
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <SearchAndFilters
          placeholder="Buscar objetos..."
          btnText={Search}
          onSearch={handleSearch}
        />

        {/* Objects Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Objetos ({total})</CardTitle>
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
