import { useEffect, useState } from 'react';
import { ChartLineLabel } from '@/components/charts/ChartLineLabel';
import { ChartRadarDots } from '@/components/charts/ChartRadarDots';
import Title from '@/components/common/Title';
import InteractionsTable from '@/components/interactions/InteractionsTable';
import Layout from '@/components/layouts/Layout';
import { api } from '@/services/api';
import Loading from '@/components/common/Loading';
import SearchAndFilters from '@/components/common/SearchAndFilters';

export default function Interactions() {
  const [interactions, setInteractions] = useState([]);
  const [limit, setLimit] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [timeSeries, setTimeSeries] = useState<
    { date: string; interactions: number }[]
  >([]);
  const [classDistribution, setClassDistribution] = useState<
    { name: string; count: number }[]
  >([]);
  const [days, setDays] = useState<number>(7);

  console.log(limit);
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

  useEffect(() => {
    const fetchTimeSeries = async () => {
      try {
        const response = await api.get(
          `/interaction/time-series?range=${days}d`
        );
        setTimeSeries(response.data || []);
      } catch (error) {
        console.error('Erro ao carregar time series:', error);
      }
    };

    fetchTimeSeries();
  }, [days]);

  useEffect(() => {
    const fetchClassDistribution = async () => {
      try {
        const response = await api.get('/class');
        const items = (response.data?.items ?? []) as any[];

        const distribution = items
          .map((c) => ({
            name: c.class_name ?? c.name ?? '—',
            count: Array.isArray(c.objects)
              ? c.objects.length
              : Number(c.count ?? 0),
          }))
          .filter((d) => d.name && typeof d.count === 'number')
          .filter((d) => d.count > 0) // ignore empty classes
          .sort((a, b) => b.count - a.count) // highest first
          .slice(0, 8); // limit to top 8 for readability

        setClassDistribution(distribution);
      } catch (error) {
        console.error('Erro ao carregar distribuição por classe', error);
      }
    };

    fetchClassDistribution();
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartRadarDots data={classDistribution} className="h-120" />

          <ChartLineLabel
            title="Interações ao longo do tempo"
            description="Série temporal de interações"
            days={days}
            data={timeSeries}
            onButtonClick={() => setDays(days === 7 ? 30 : 7)}
            // className="h-120"
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
