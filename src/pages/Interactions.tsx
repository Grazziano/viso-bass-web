import { useEffect, useState } from 'react';
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
          btnText="Filtros"
        />

        {/* Interactions Table */}
        <InteractionsTable interactions={interactions} total={total} />
      </div>
    </Layout>
  );
}
