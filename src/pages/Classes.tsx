import { useEffect, useState } from 'react';
import ClassCard from '@/components/classes/ClassCard';
import Title from '@/components/common/Title';
import Layout from '@/components/layouts/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { api } from '@/services/api';
import Loading from '@/components/common/Loading';
import SearchInput from '@/components/common/SearchInput';

export default function Classes() {
  const [classList, setClassList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const response = await api.get('class');
        setClassList(response.data.items);
        // console.log(response.data.items);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

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

          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Nova Classe
          </Button>
        </div>
      </div>

      <SearchInput placeholder="Buscar classes..." />

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {classList.map((classItem) => (
          <ClassCard
            key={classItem.id}
            id={classItem.id}
            name={classItem.class_name}
            class_function={classItem.class_function}
            objects={classItem.objects}
          />
        ))}
      </div>
    </Layout>
  );
}
