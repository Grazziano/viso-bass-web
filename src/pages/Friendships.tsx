import { useEffect, useState, useRef } from 'react';
import Title from '@/components/common/Title';
import FriendshipCard from '@/components/friendships/FriendshipCard';
import FriendshipsTable from '@/components/friendships/FriendshipsTable';
import Layout from '@/components/layouts/Layout';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import SearchAndFilters from '@/components/common/SearchAndFilters';
import type { IFriendship } from '@/types/friendship';
import { api } from '@/services/api';
import Loading from '@/components/common/Loading';
import { Button } from '@/components/ui/button';

export default function Friendships() {
  const [pagerankFriendship, setPagerankFriendship] = useState<IFriendship[]>(
    []
  );
  const [topRelevant, setTopRelevant] = useState<IFriendship[]>([]);
  const [limit, setLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const totalPages = Math.max(1, Math.ceil(total / (limit || 1)));

  // Ensure current page does not exceed total pages
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [totalPages, page]);

  useEffect(() => {
    const fetchFriendships = async () => {
      try {
        setLoading(true);
        const friendshipsData = await api.get(
          `/pagerank-friendship?page=${page}&limit=${limit}&sort=relevance`
        );
        const items = friendshipsData.data.items ?? [];
        setPagerankFriendship(items);
        setLimit(friendshipsData.data.limit ?? limit);
        setPage(friendshipsData.data.page ?? page);
        setTotal(
          friendshipsData.data.total ?? friendshipsData.data.items?.length ?? 0
        );

        console.log(items);
        setTopRelevant(items.slice(0, 3));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriendships();
  }, [page, limit]);

  const handleSearch = async (query: string) => {
    // Cancel previous request if still pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Reset to first page when searching
    const searchPage = query ? 1 : page;
    if (query) setPage(1);

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();

    try {
      const url = query
        ? `/pagerank-friendship/search?name=${encodeURIComponent(
            query
          )}&page=${searchPage}&limit=${limit}`
        : `/pagerank-friendship?page=${page}&limit=${limit}&sort=relevance`;
      const response = await api.get(url, {
        signal: abortControllerRef.current.signal,
      });
      const items = response.data.items || [];
      setPagerankFriendship(items);
      setTopRelevant(items.slice(0, 3));
      setLimit(response.data.limit ?? limit);
      setPage(response.data.page ?? searchPage);
      setTotal(response.data.total ?? response.data.items?.length ?? 0);
    } catch (err) {
      // Ignore abort errors (previous requests cancelled)
      if (err instanceof Error && err.name !== 'AbortError') {
        console.error('Erro na busca:', err);
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
        <FriendshipCard friendships={topRelevant} />

        <SearchAndFilters
          placeholder="Buscar relações..."
          btnText={Search}
          onSearch={handleSearch}
        />

        {/* Friendships Table */}
        <FriendshipsTable friendships={pagerankFriendship} total={total} />

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Exibindo {Math.min((page - 1) * limit + 1, total || 0)} -{' '}
            {Math.min(page * limit, total)} de {total}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="px-3 py-1 rounded-md bg-muted/10 text-sm">
              Página {page} de {totalPages}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
