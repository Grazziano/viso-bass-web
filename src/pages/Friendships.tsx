import { useEffect, useState, useRef } from 'react';
import Title from '@/components/common/Title';
import FriendshipCard from '@/components/friendships/FriendshipCard';
import FriendshipsTable from '@/components/friendships/FriendshipsTable';
import Layout from '@/components/layouts/Layout';
import { Search } from 'lucide-react';
import SearchAndFilters from '@/components/common/SearchAndFilters';
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
  const abortControllerRef = useRef<AbortController | null>(null);

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

  const handleSearch = async (query: string) => {
    // Cancel previous request if still pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();

    try {
      const url = query
        ? `/pagerank-friendship/search?name=${encodeURIComponent(query)}`
        : '/pagerank-friendship';
      const response = await api.get(url, {
        signal: abortControllerRef.current.signal,
      });
      setPagerankFriendship(response.data.items || []);
      setTotal(response.data.total ?? response.data.items?.length ?? 0);
    } catch (error: unknown) {
      // Ignore abort errors (previous requests cancelled)
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Erro na busca:', error);
      }
    }
  };

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

        <SearchAndFilters
          placeholder="Buscar relações..."
          btnText={Search}
          onSearch={handleSearch}
        />

        {/* Friendships Table */}
        <FriendshipsTable friendships={pagerankFriendship} total={total} />
      </div>
    </Layout>
  );
}
