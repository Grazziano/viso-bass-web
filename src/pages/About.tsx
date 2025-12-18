import Layout from '@/components/layouts/Layout';
import Title from '@/components/common/Title';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Info,
  Layers,
  Globe2,
  Users,
  Database,
  Link as LinkIcon,
  QrCode,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const link = 'https://sol.sbc.org.br/index.php/semish/article/view/25072';

  const technologies = [
    'React 19',
    'Vite 7',
    'TypeScript',
    'Tailwind CSS 4',
    'Shadcn UI',
    'lucide-react',
    'sonner',
    'NestJS 11',
    'MongoDB',
    'Jest',
  ];

  const applicationLinks = [
    { icon: Info, text: 'Dashboard', link: '/dashboard' },
    { icon: Layers, text: 'Objetos', link: '/objects' },
    { icon: Layers, text: 'Classes', link: '/classes' },
    { icon: Users, text: 'Interações', link: '/interactions' },
    { icon: Globe2, text: 'Ambientes', link: '/environments' },
    { icon: Users, text: 'Relações', link: '/friendships' },
  ];

  const relatedLinks = [
    {
      text: 'Artigo do modelo VISO na SOL-SBC',
      link: link,
    },
    {
      text: 'Universidade Federal de Pelotas (UFPel)',
      link: 'https://www.ufpel.edu.br',
    },
    {
      text: 'Repositório da API do projeto no GitHub',
      link: 'https://github.com/Grazziano/viso-bass-api',
    },
    {
      text: 'Repositório do frontend do projeto no GitHub',
      link: 'https://github.com/Grazziano/viso-bass-web',
    },
    {
      text: 'Outros projetos relacionados',
      link: 'https://grazziano.github.io/projetos-siot-ufpel/',
    },
    {
      text: 'Perfil do criador no LinkedIn',
      link: 'https://www.linkedin.com/in/grazziano-fagundes/',
    },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <Title
          title="Sobre"
          subtitle="Plataforma VISO-BASS para visualização e análise da Social IoT"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="space-y-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Info className="w-5 h-5 text-primary-foreground" />
              </div>
              <CardTitle>O que é o VISO-BASS</CardTitle>
              <CardDescription>
                Uma plataforma baseada no modelo{' '}
                <a
                  href={link}
                  className="text-primary underline hover:opacity-80 transition-opacity duration-300 ease-in-out"
                  target="_blank"
                >
                  VISO
                </a>{' '}
                (Virtual Interactions between Social Objects) para persistência,
                visualização e análise de dados em ecossistemas de Social IoT.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                O VISO-BASS (VISO-Based API for Structured Storage) organiza
                entidades como objetos, classes, ambientes, interações e
                relações sociais, permitindo observar como dispositivos e
                agentes se conectam e cooperam.
              </p>
              <p>
                Esta interface web foi construída para facilitar a navegação
                pelos dados, oferecer métricas e servir como base para
                integrações futuras.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="space-y-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-primary-foreground" />
              </div>
              <CardTitle>Tecnologias</CardTitle>
              <CardDescription>Stack utilizada na aplicação</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {technologies.map((item) => (
                  <span className="px-3 py-1 rounded-md border text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="space-y-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Layers className="w-5 h-5 text-primary-foreground" />
              </div>
              <CardTitle>Módulos do sistema</CardTitle>
              <CardDescription>
                Navegue pelos principais domínios
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {applicationLinks.map((item) => (
                <Link
                  to={item.link}
                  className="flex items-center gap-2 px-3 py-2 rounded-md border"
                >
                  <item.icon className="w-4 h-4" />
                  {item.text}
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="space-y-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <QrCode className="w-5 h-5 text-primary-foreground" />
              </div>
              <CardTitle>Informações adicionais</CardTitle>
              <CardDescription>Versão e formas de contato</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>Versão da interface: 1.0.0</p>
              <p>
                Se você tiver dúvidas, sugestões ou encontrar problemas, utilize
                o menu superior para navegar ou entre em contato com os
                responsáveis pelo projeto.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="space-y-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-foreground" />
              </div>
              <CardTitle>Contribuição</CardTitle>
              <CardDescription>
                Formas de colaborar com o VISO-BASS
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                O projeto está em constante evolução. Seu feedback é essencial
                para aprimorar a usabilidade, as visualizações e as análises
                oferecidas pela plataforma.
              </p>
              <p>
                Caso queira contribuir, você pode compartilhar sugestões de
                melhorias, apontar problemas encontrados durante o uso ou propor
                novas visualizações e métricas a serem incorporadas.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="space-y-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <LinkIcon className="w-5 h-5 text-primary-foreground" />
              </div>
              <CardTitle>Links relacionados</CardTitle>
              <CardDescription>
                Material complementar sobre o modelo e o projeto
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {relatedLinks.map((item) => (
                <a
                  href={item.link}
                  target="_blank"
                  className="block text-primary underline hover:opacity-80 transition-opacity duration-300 ease-in-out"
                >
                  {item.text}
                </a>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
