import Chart from '@/components/common/Chart';
import CardStatus from '@/components/dashboard/CardStatus';
import Layout from '@/components/layouts/Layout';
import Title from '@/components/common/Title';
import Activities from '@/components/dashboard/Activities';
import { ActivitySquare, Box, Globe2, Layers, Users } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      icon: Box,
      label: 'Objetos',
      value: '1,234',
      change: '+12%',
      color: 'text-blue-500',
    },
    {
      icon: Layers,
      label: 'Classes',
      value: '45',
      change: '+5%',
      color: 'text-cyan-500',
    },
    {
      icon: ActivitySquare,
      label: 'Interações',
      value: '8,765',
      change: '+23%',
      color: 'text-indigo-500',
    },
    {
      icon: Globe2,
      label: 'Ambientes',
      value: '23',
      change: '+3%',
      color: 'text-teal-500',
    },
    {
      icon: Users,
      label: 'Relações',
      value: '567',
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

        <CardStatus stats={stats} />

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
