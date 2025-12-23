import { useEffect, useState, useRef } from 'react';
import ClassCard from '@/components/classes/ClassCard';
import Title from '@/components/common/Title';
import Layout from '@/components/layouts/Layout';
import { Button } from '@/components/ui/button';
import { Plus, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { api } from '@/services/api';

import Loading from '@/components/common/Loading';
import SearchAndFilters from '@/components/common/SearchAndFilters';

type ClassItem = {
  id: string;
  class_name: string;
  class_function: string[];
  objects: string[];
};

export default function Classes() {
  const [classList, setClassList] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(6);
  const [total, setTotal] = useState<number>(0);
  const totalPages = Math.max(1, Math.ceil(total / (limit || 1)));

  // Ensure current page does not exceed total pages
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [totalPages, page]);

  // const [objectCounts, setObjectCounts] = useState<{ name: string; count: number }[]>([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/class?page=${page}&limit=${limit}`);
        setClassList(response.data.items ?? []);
        setLimit(response.data.limit ?? limit);
        setPage(response.data.page ?? page);
        setTotal(response.data.total ?? response.data.items?.length ?? 0);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
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
        ? `/class/search?name=${encodeURIComponent(
            query
          )}&page=${searchPage}&limit=${limit}`
        : `/class?page=${page}&limit=${limit}`;
      const response = await api.get(url, {
        signal: abortControllerRef.current.signal,
      });
      setClassList(response.data.items || []);
      setLimit(response.data.limit ?? limit);
      setPage(response.data.page ?? searchPage);
      setTotal(response.data.total ?? response.data.items?.length ?? 0);
    } catch (error: unknown) {
      // Ignore abort errors (previous requests cancelled)
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Erro na busca:', error);
      }
    }
  };

  // useEffect(() => {
  //   const fetchObjectCounts = async () => {
  //     try {
  //       const response = await api.get('/class/object-counts');
  //       const raw = Array.isArray(response.data?.items) ? response.data.items : response.data;
  //       type CountsItem = {
  //         class_name?: string;
  //         name?: string;
  //         count?: number;
  //         objectsCount?: number;
  //         total?: number;
  //       };
  //       const mapped = (raw as CountsItem[]).map((item) => ({
  //         name: (item.class_name ?? item.name ?? 'Desconhecido') as string,
  //         count: item.count ?? item.objectsCount ?? item.total ?? 0,
  //       }));
  //       setObjectCounts(mapped);
  //     } catch (error) {
  //       console.log('Erro ao carregar distribuição por classe', error);
  //     }
  //   };

  //   fetchObjectCounts();
  // }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Title
            title="Classes IoT"
            subtitle="Gerencie as classes cadastradas no sistema"
          />

          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" />
            Nova Classe
          </Button>
        </div>

        <SearchAndFilters
          placeholder="Buscar classes..."
          btnText={Search}
          onSearch={handleSearch}
        />

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classList.map((classItem, index) => (
            <ClassCard
              key={index}
              id={classItem.id}
              name={classItem.class_name}
              class_function={classItem.class_function}
              objects={classItem.objects}
            />
          ))}
        </div>

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
