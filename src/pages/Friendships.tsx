import InputSearch from '@/components/common/InputSearch';
import Title from '@/components/common/Title';
import FriendshipCard from '@/components/friendships/FriendshipCard';
import FriendshipsTable from '@/components/friendships/FriendshipsTable';
import Layout from '@/components/layouts/Layout';

export default function Friendships() {
  const friendships = [
    {
      id: '1',
      device1: 'Sensor A1',
      device2: 'Gateway G1',
      score: 0.95,
      rank: 1,
      interactions: 1250,
    },
    {
      id: '2',
      device1: 'Camera C1',
      device2: 'Storage S1',
      score: 0.89,
      rank: 2,
      interactions: 980,
    },
    {
      id: '3',
      device1: 'Sensor M3',
      device2: 'Alert System A1',
      score: 0.82,
      rank: 3,
      interactions: 756,
    },
    {
      id: '4',
      device1: 'Display D1',
      device2: 'Content Server CS1',
      score: 0.78,
      rank: 4,
      interactions: 645,
    },
    {
      id: '5',
      device1: 'Actuator AC1',
      device2: 'Controller CT1',
      score: 0.75,
      rank: 5,
      interactions: 589,
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <Title
          title="Relações de Amizade (PageRank)"
          subtitle="Analise as relações mais relevantes entre objetos"
        />

        {/* Top Relationships */}
        <FriendshipCard friendships={friendships} />

        <InputSearch placeholder="Buscar relações..." />

        {/* Friendships Table */}
        <FriendshipsTable friendships={friendships} />
      </div>
    </Layout>
  );
}
