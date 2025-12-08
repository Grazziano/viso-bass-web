import Title from '@/components/common/Title';
import EnvironmentCard from '@/components/environments/EnvironmentCard';
import Layout from '@/components/layouts/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';

export default function Environments() {
  const environments = [
    {
      id: '1',
      name: 'Sala de Servidores A',
      location: 'Edifício Principal - Piso 2',
      devices: 34,
      status: 'Operacional',
    },
    {
      id: '2',
      name: 'Escritório Open Space',
      location: 'Edifício Principal - Piso 3',
      devices: 89,
      status: 'Operacional',
    },
    {
      id: '3',
      name: 'Laboratório IoT',
      location: 'Centro de Pesquisa',
      devices: 56,
      status: 'Manutenção',
    },
    {
      id: '4',
      name: 'Estacionamento Inteligente',
      location: 'Subsolo',
      devices: 23,
      status: 'Operacional',
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Title
            title="Ambientes ONA"
            subtitle="Gerencie os ambientes e suas localizações"
          />

          <Button className="bg-blue-500 hover:bg-blue-600">
            <Plus className="w-4 h-4 mr-2" />
            Novo Ambiente
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar ambientes..." className="pl-10" />
            </div>
          </CardContent>
        </Card>

        {/* Environments Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {environments.map((env) => (
            <EnvironmentCard key={env.id} {...env} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
