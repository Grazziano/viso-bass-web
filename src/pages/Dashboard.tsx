import { useEffect, useState } from 'react';
import Chart from '@/components/common/Chart';
import CardStatus from '@/components/dashboard/CardStatus';
import Layout from '@/components/layouts/Layout';
import Title from '@/components/common/Title';
import Activities from '@/components/dashboard/Activities';
import { ActivitySquare, Box, Globe2, Layers, Users } from 'lucide-react';
import { api } from '@/services/api';

export default function Dashboard() {
  const [objects, setObjects] = useState<number>(0);
  const [classes, setClasses] = useState<number>(0);
  const [interactions, setInteractions] = useState<number>(0);
  const [enviroments, setEnviroments] = useState<number>(0);
  const [friendships, setFriendships] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [objectsRes, classesRes, interactionsRes, envRes, friendshipRes] =
          await Promise.all([
            api.get('/object/count'),
            api.get('/class/count'),
            api.get('/interaction/count'),
            api.get('/ona-environment/count'),
            api.get('/pagerank-friendship/count'),
          ]);

        console.log(objectsRes);

        setObjects(objectsRes.data.total);
        setClasses(classesRes.data.total);
        setInteractions(interactionsRes.data.total);
        setEnviroments(envRes.data.total);
        setFriendships(friendshipRes.data.total);
      } catch (error) {
        console.log('Erro ao carregar:', error);
        // console.log('Erro na rota:', error.config?.url);
      }
    };

    fetchData();
  }, []);

  function formatNumberBR(value: number, decimals: number = 2) {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  }

  const stats = [
    {
      icon: Box,
      label: 'Objetos',
      value: formatNumberBR(objects),
      loading: !objects,
      change: '+12%',
      color: 'text-blue-500',
    },
    {
      icon: Layers,
      label: 'Classes',
      value: formatNumberBR(classes),
      loading: !classes,
      change: '+5%',
      color: 'text-cyan-500',
    },
    {
      icon: ActivitySquare,
      label: 'Interações',
      value: formatNumberBR(interactions),
      loading: !interactions,
      change: '+23%',
      color: 'text-indigo-500',
    },
    {
      icon: Globe2,
      label: 'Ambientes',
      value: formatNumberBR(enviroments),
      loading: !enviroments,
      change: '+3%',
      color: 'text-teal-500',
    },
    {
      icon: Users,
      label: 'Relações',
      value: formatNumberBR(friendships),
      loading: !friendships,
      change: '+18%',
      color: 'text-sky-500',
    },
  ];

  const recentActivities = [
    {
      type: 'Objeto',
      action: 'criado',
      name: 'Sensor de Temperatura #123',
      time: '2 minutos atrás',
    },
    {
      type: 'Interação',
      action: 'registrada',
      name: 'Device A → Device B',
      time: '5 minutos atrás',
    },
    {
      type: 'Classe',
      action: 'atualizada',
      name: 'Sensores Ambientais',
      time: '10 minutos atrás',
    },
    {
      type: 'Ambiente',
      action: 'criado',
      name: 'Sala de Servidor #2',
      time: '15 minutos atrás',
    },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <Title title="Dashboard" subtitle="Visão geral do sistema VISO-BASS" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {stats.map((stat) => (
            <CardStatus
              key={stat.label}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
              loading={stat.loading}
              change={stat.change}
              color={stat.color}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Chart
            title="Interações ao Longo do Tempo"
            content="Gráfico de série temporal será exibido aqui"
          />

          <Chart
            title="Distribuição por Classe"
            content="Gráfico de distribuição será exibido aqui"
          />
        </div>

        <Activities activities={recentActivities} />
      </div>
    </Layout>
  );
}
