import { useEffect, useState } from 'react';
import InputSearch from '@/components/common/InputSearch';
import Title from '@/components/common/Title';
import FriendshipCard from '@/components/friendships/FriendshipCard';
import FriendshipsTable from '@/components/friendships/FriendshipsTable';
import Layout from '@/components/layouts/Layout';
import type { IFriendship } from '@/types/friendship';
import { api } from '@/services/api';
import Loading from '@/components/common/Loading';

export default function Friendships() {
  const [pagerankFriendship, setPagerankFriendship] = useState<IFriendship[]>(
    []
  );
  const [limit, setLimit] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchFriendships = async () => {
      try {
        setLoading(true);
        const friendshipsData = await api.get('/pagerank-friendship');
        setPagerankFriendship(friendshipsData.data.items);
        setLimit(friendshipsData.data.limit);
        setPage(friendshipsData.data.page);
        setTotal(friendshipsData.data.total);

        console.log(friendshipsData.data.items);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriendships();
  }, []);

  console.log(limit);
  console.log(page);

  if (loading) return <Loading />;

  return (
    <Layout>
      <div className="space-y-6">
        <Title
          title="Relações de Amizade (PageRank)"
          subtitle="Analise as relações mais relevantes entre objetos"
        />

        {/* Top Relationships */}
        <FriendshipCard friendships={pagerankFriendship} />

        <InputSearch placeholder="Buscar relações..." />

        {/* Friendships Table */}
        <FriendshipsTable friendships={pagerankFriendship} total={total} />
      </div>
    </Layout>
  );
}
