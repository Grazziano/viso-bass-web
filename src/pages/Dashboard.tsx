import { useEffect, useState } from 'react';
import CardStatus from '@/components/dashboard/CardStatus';
import Layout from '@/components/layouts/Layout';
import Title from '@/components/common/Title';
import Activities from '@/components/dashboard/Activities';
import { ActivitySquare, Box, Globe2, Layers, Users } from 'lucide-react';
import { api } from '@/services/api';
import type { IObject } from '@/types/objects';
import type { IClass } from '@/types/classes';
import type { IInteraction } from '@/types/interaction';
import type { IEnvironment } from '@/types/enrironment';
import type { IFriendship } from '@/types/friendship';
import { formatNumberBR } from '@/utils/format-number.util';
import { ChartLineLabel } from '@/components/charts/ChartLineLabel';
import { ChartPieLabel } from '@/components/charts/ChartPieLabel';
import { useCharts } from '@/context/useCharts';

export default function Dashboard() {
  const [objects, setObjects] = useState<number>(0);
  const [classes, setClasses] = useState<number>(0);
  const [interactions, setInteractions] = useState<number>(0);
  const [enviroments, setEnviroments] = useState<number>(0);
  const [friendships, setFriendships] = useState<number>(0);

  const [lastObject, setLastObject] = useState<IObject>();
  const [lastClass, setLastClass] = useState<IClass>();
  const [lastInteraction, setLastInteraction] = useState<IInteraction>();
  const [lastEnvironment, setLastEnvironment] = useState<IEnvironment>();
  const [lastFriendship, setLastFriendship] = useState<IFriendship>();

  console.log(
    'lastInteraction => ',
    lastInteraction,
    'lastEnvironment =>',
    lastEnvironment,
    'lastFriendship =>',
    lastFriendship
  );

  const { statusCounts, timeSeries, days, setDays } = useCharts();

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

  useEffect(() => {
    const fechActivities = async () => {
      try {
        const [objectRes, classRes, interactionRes, envRes, friendshipRes] =
          await Promise.all([
            api.get('/object/last'),
            api.get('/class/last'),
            api.get('/interaction/last'),
            api.get('/ona-environment/last'),
            api.get('/pagerank-friendship/last'),
          ]);

        setLastObject(objectRes.data);
        setLastClass(classRes.data);
        setLastInteraction(interactionRes.data);
        setLastEnvironment(envRes.data);
        setLastFriendship(friendshipRes.data);
      } catch (error) {
        console.log('Erro ao carregar atividades:', error);
      }
    };

    fechActivities();
  }, []);

  const stats = [
    {
      icon: Box,
      label: 'Objetos',
      value: formatNumberBR(objects, 0),
      loading: !objects,
      change: '+12%',
      color: 'text-primary',
    },
    {
      icon: Layers,
      label: 'Classes',
      value: formatNumberBR(classes, 0),
      loading: !classes,
      change: '+5%',
      color: 'text-cyan-500',
    },
    {
      icon: ActivitySquare,
      label: 'Interações',
      value: formatNumberBR(interactions, 0),
      loading: !interactions,
      change: '+23%',
      color: 'text-indigo-500',
    },
    {
      icon: Globe2,
      label: 'Ambientes',
      value: formatNumberBR(enviroments, 0),
      loading: !enviroments,
      change: '+3%',
      color: 'text-teal-500',
    },
    {
      icon: Users,
      label: 'Relações',
      value: formatNumberBR(friendships, 0),
      loading: !friendships,
      change: '+18%',
      color: 'text-sky-500',
    },
  ];

  const recentActivities = [
    {
      type: 'Objeto',
      action: 'criado',
      name: lastObject?.obj_name ?? 'Objeto Desconhecido',
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
      name: lastClass?.class_name ?? 'Classe Desconhecida',
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
          <ChartLineLabel
            title="Interações ao longo do tempo"
            description="Série temporal de interações"
            days={days}
            data={timeSeries}
            onButtonClick={() => setDays(days === 7 ? 30 : 7)}
            className="w-full h-96"
          />

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
        </div>

        <Activities activities={recentActivities} />
      </div>
    </Layout>
  );
}
