import { useEffect, useRef, useState } from 'react';
import { ChartBarDays } from '@/components/charts/ChartBarDays';
import Title from '@/components/common/Title';
import InteractionsTable from '@/components/interactions/InteractionsTable';
import Layout from '@/components/layouts/Layout';
import { api } from '@/services/api';
import Loading from '@/components/common/Loading';
import SearchAndFilters from '@/components/common/SearchAndFilters';
import { useCharts } from '@/context/useCharts';

export default function Interactions() {
  const [interactions, setInteractions] = useState([]);
  const [limit, setLimit] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const { timeSeries, countByDay, days, period, setPeriod } = useCharts();
  const abortControllerRef = useRef<AbortController | null>(null);

  console.log(limit);
  console.log(timeSeries);
  console.log(days);
  console.log(page);

  useEffect(() => {
    const fetchInteractions = async () => {
      try {
        setLoading(true);
        const response = await api.get('/interaction');
        setLimit(response.data.limit);
        setPage(response.data.page);
        setTotal(response.data.total);
        setInteractions(response.data.items);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInteractions();
  }, []);

  const handleSearch = async (query: string) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    try {
      const url = query
        ? `/interaction/search?name=${encodeURIComponent(query)}`
        : '/interaction';
      const response = await api.get(url, {
        signal: abortControllerRef.current.signal,
      });
      setLimit(response.data.limit ?? 0);
      setPage(response.data.page ?? 0);
      setTotal(response.data.total ?? 0);
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
      </div>
    </Layout>
  );
}
