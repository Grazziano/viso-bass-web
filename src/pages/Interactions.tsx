import { useEffect, useRef, useState } from 'react';
import { ChartBarDays } from '@/components/charts/ChartBarDays';
import Title from '@/components/common/Title';
import InteractionsTable from '@/components/interactions/InteractionsTable';
import Layout from '@/components/layouts/Layout';
import { api } from '@/services/api';
import Loading from '@/components/common/Loading';
import SearchAndFilters from '@/components/common/SearchAndFilters';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCharts } from '@/context/useCharts';

export default function Interactions() {
  const [interactions, setInteractions] = useState([]);
  const [limit, setLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const { timeSeries, countByDay, days, period, setPeriod } = useCharts();
  const abortControllerRef = useRef<AbortController | null>(null);
  const totalPages = Math.max(1, Math.ceil(total / (limit || 1)));

  // Ensure current page does not exceed total pages
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [totalPages, page]);
  console.log(limit);
  console.log(timeSeries);
  console.log(days);
  console.log(page);

  useEffect(() => {
    const fetchInteractions = async () => {
      try {
        setLoading(true);
        const response = await api.get(
          `/interaction?page=${page}&limit=${limit}`
        );
        setLimit(response.data.limit ?? limit);
        setPage(response.data.page ?? page);
        setTotal(response.data.total ?? response.data.items?.length ?? 0);
        setInteractions(response.data.items ?? []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInteractions();
  }, [page, limit]);

  const handleSearch = async (query: string) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Reset to first page when searching
    const searchPage = query ? 1 : page;
    if (query) setPage(1);

    abortControllerRef.current = new AbortController();
    try {
      const url = query
        ? `/interaction/search?name=${encodeURIComponent(
            query
          )}&page=${searchPage}&limit=${limit}`
        : `/interaction?page=${page}&limit=${limit}`;
      const response = await api.get(url, {
        signal: abortControllerRef.current.signal,
      });
      setLimit(response.data.limit ?? limit);
      setPage(response.data.page ?? searchPage);
      setTotal(response.data.total ?? response.data.items?.length ?? 0);
      setInteractions(response.data.items ?? []);
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Erro na busca de interações:', error);
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <div className="space-y-6">
        <Title
          title="Interações"
          subtitle="Monitore as interações entre objetos IoT"
        />

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <ChartBarDays
            data={countByDay}
            className="w-full h-96"
            period={period}
            onButtonClick={() =>
              setPeriod(period === 'month' ? 'week' : 'month')
            }
          />
        </div>

        {/* Search and Filters */}
        <SearchAndFilters
          placeholder="Buscar interações..."
          btnText="Buscar"
          onSearch={handleSearch}
        />

        {/* Interactions Table */}
        <InteractionsTable interactions={interactions} total={total} />

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
