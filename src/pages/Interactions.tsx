import { useEffect, useState } from 'react';
import { ChartLineLabel } from '@/components/charts/ChartLineLabel';
import { ChartBarDays } from '@/components/charts/ChartBarDays';
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
  // const [classDistribution, setClassDistribution] = useState<
  //   { name: string; count: number }[]
  // >([]);
  const [days, setDays] = useState<number>(7);
  const [period, setPeriod] = useState<'month' | 'week'>('month');
  const [countByDay, setCountByDay] = useState<
    { day: string; count: number }[]
  >([]);

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

  // useEffect(() => {
  //   const fetchClassDistribution = async () => {
  //     try {
  //       const response = await api.get('/class');
  //       const items = (response.data?.items ?? []) as any[];

  //       const distribution = items
  //         .map((c) => ({
  //           name: c.class_name ?? c.name ?? '—',
  //           count: Array.isArray(c.objects)
  //             ? c.objects.length
  //             : Number(c.count ?? 0),
  //         }))
  //         .filter((d) => d.name && typeof d.count === 'number')
  //         .filter((d) => d.count > 0) // ignore empty classes
  //         .sort((a, b) => b.count - a.count) // highest first
  //         .slice(0, 8); // limit to top 8 for readability

  //       setClassDistribution(distribution);
  //     } catch (error) {
  //       console.error('Erro ao carregar distribuição por classe', error);
  //     }
  //   };

  //   fetchClassDistribution();
  // }, []);

  useEffect(() => {
    const fetchCountByDay = async () => {
      try {
        const response = await api.get(
          '/interaction/count-by-day?period=' + period
        );
        let data = (response.data ?? []) as any[];

        // Se a resposta for um objeto com uma propriedade de array, extrair
        if (!Array.isArray(data) && typeof data === 'object') {
          const obj = data as any;
          data = obj.data || obj.items || Object.values(obj).flat();
        }

        // console.log('Raw data from API:', data);

        // Transformar para o formato esperado
        const formatted = (Array.isArray(data) ? data : []).map((item) => {
          // Suportar múltiplos formatos de campo de dia e contagem
          const dayValue = item.day ?? item.date ?? item._id ?? '—';
          const countValue = item.count ?? item.total ?? item.interactions ?? 0;

          return {
            day: String(dayValue),
            count: Number(countValue) || 0,
          };
        });

        // console.log('Formatted data for chart:', formatted);
        setCountByDay(formatted);
      } catch (error) {
        console.error('Erro ao carregar contagem por dia:', error);
      }
    };

    fetchCountByDay();
  }, [period]);

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

          {/* <ChartLineLabel
            title="Interações ao longo do tempo"
            description="Série temporal de interações"
            days={days}
            data={timeSeries}
            onButtonClick={() => setDays(days === 7 ? 30 : 7)}
          /> */}
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
