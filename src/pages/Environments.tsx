import { useEffect, useState, useRef } from 'react';
import Title from '@/components/common/Title';
import EnvironmentCard from '@/components/environments/EnvironmentCard';
import Layout from '@/components/layouts/Layout';
import { Button } from '@/components/ui/button';
import { Plus, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { api } from '@/services/api';
import Loading from '@/components/common/Loading';
import SearchAndFilters from '@/components/common/SearchAndFilters';
import type { IEnvironment } from '@/types/enrironment';

export default function Environments() {
  const [environments, setEnvironments] = useState<IEnvironment[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(6);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const totalPages = Math.max(1, Math.ceil(total / (limit || 1)));

  // Ensure current page does not exceed total pages
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [totalPages, page]);

  useEffect(() => {
    const fetchEnvironments = async () => {
      try {
        setLoading(true);
        const response = await api.get(
          `/ona-environment?page=${page}&limit=${limit}`
        );
        setEnvironments(response.data.items ?? []);
        setLimit(response.data.limit ?? limit);
        setPage(response.data.page ?? page);
        setTotal(response.data.total ?? response.data.items?.length ?? 0);
        // console.log(response.data.items);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnvironments();
  }, [page, limit]);

  const handleSearch = async (query: string) => {
    // Cancel previous request if still pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Reset to first page when searching
    const searchPage = query ? 1 : page;
    if (query) setPage(1);

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();

    try {
      const url = query
        ? `/ona-environment/search?name=${encodeURIComponent(
            query
          )}&page=${searchPage}&limit=${limit}`
        : `/ona-environment?page=${page}&limit=${limit}`;
      const response = await api.get(url, {
        signal: abortControllerRef.current.signal,
      });
      setEnvironments(response.data.items || []);
      setLimit(response.data.limit ?? limit);
      setPage(response.data.page ?? searchPage);
      setTotal(response.data.total ?? response.data.items?.length ?? 0);
    } catch (error: unknown) {
      // Ignore abort errors (previous requests cancelled)
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Erro na busca:', error);
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Title
            title="Ambientes ONA"
            subtitle="Gerencie os ambientes e suas localizações"
          />

          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" />
            Novo Ambiente
          </Button>
        </div>

        <SearchAndFilters
          placeholder="Buscar ambientes..."
          btnText={Search}
          onSearch={handleSearch}
        />

        {/* Environments Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {environments.map((env) => (
            <EnvironmentCard key={env._id} {...env} />
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Exibindo {Math.min((page - 1) * limit + 1, total || 0)} -{' '}
            {Math.min(page * limit, total)} de {total}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="px-3 py-1 rounded-md bg-muted/10 text-sm">
              Página {page} de {totalPages}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
