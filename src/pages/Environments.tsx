import { useEffect, useState, useRef } from 'react';
import Title from '@/components/common/Title';
import EnvironmentCard from '@/components/environments/EnvironmentCard';
import Layout from '@/components/layouts/Layout';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { api } from '@/services/api';
import Loading from '@/components/common/Loading';
import SearchAndFilters from '@/components/common/SearchAndFilters';
import type { IEnvironment } from '@/types/enrironment';

export default function Environments() {
  const [environments, setEnvironments] = useState<IEnvironment[]>([]);
  // const [page, setPage] = useState<number>(0);
  // const [limit, setLimit] = useState<number>(0);
  // const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchEnvironments = async () => {
      try {
        setLoading(true);
        const response = await api.get('/ona-environment');
        setEnvironments(response.data.items);
        // setLimit(response.data.limit);
        // setPage(response.data.page);
        // setTotal(response.data.total);
        // console.log(response.data.items);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnvironments();
  }, []);

  const handleSearch = async (query: string) => {
    // Cancel previous request if still pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();

    try {
      const url = query
        ? `/ona-environment/search?name=${encodeURIComponent(query)}`
        : '/ona-environment';
      const response = await api.get(url, {
        signal: abortControllerRef.current.signal,
      });
      setEnvironments(response.data.items || []);
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
      </div>
    </Layout>
  );
}
