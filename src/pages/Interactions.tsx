import { useEffect, useState } from 'react';
import Chart from '@/components/common/Chart';
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
          <Chart
            title="Interações por Dia"
            content="Gráfico de barras será exibido aqui"
          />

          <Chart
            title="Série Temporal"
            content="Gráfico de linha será exibido aqui"
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
