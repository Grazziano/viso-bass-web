import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Title from '@/components/common/Title';
import Layout from '@/components/layouts/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft } from 'lucide-react';
import { api } from '@/services/api';
import Loading from '@/components/common/Loading';
import type { IEnvironment } from '@/types/enrironment';

export default function EnvironmentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [environment, setEnvironment] = useState<IEnvironment | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchEnvironment = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/ona-environment/${id}`);
        setEnvironment(response.data);
      } catch (error) {
        console.error('Erro ao buscar ambiente:', error);
        navigate('/environments');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEnvironment();
    }
  }, [id, navigate]);

  if (loading) return <Loading />;

  if (!environment) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Ambiente não encontrado</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/environments')}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>

        <Title
          title={environment.env_object_i.obj_name}
          subtitle="Detalhes do Ambiente"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total de Dispositivos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{environment.objects.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Interações Totais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {environment.env_total_interactions}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge
                variant={
                  environment.env_total_valid === 0 ? 'default' : 'secondary'
                }
                className="bg-primary text-primary-foreground"
              >
                {environment.env_total_valid === 0
                  ? 'Operacional'
                  : 'Manutenção'}
              </Badge>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informações Gerais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Objeto</p>
              <p className="text-base font-medium">
                {environment.env_object_i.obj_name}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Dados com Novidades
              </p>
              <p className="text-base font-medium">
                {environment.env_total_new}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Dados Válidos</p>
              <p className="text-base font-medium">
                {environment.env_total_valid}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Criado em</p>
              <p className="text-base font-medium">
                {new Date(environment.createdAt).toLocaleDateString('pt-BR')}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Atualizado em</p>
              <p className="text-base font-medium">
                {new Date(environment.updatedAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dispositivos ({environment.objects.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {environment.objects.length > 0 ? (
              <div className="space-y-2">
                {environment.objects.map((obj, index) => (
                  <div
                    key={index}
                    className="p-3 bg-muted/50 rounded-md text-sm"
                  >
                    {obj}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">
                Nenhum dispositivo registrado
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
