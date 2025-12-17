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
                <span className="px-3 py-1 rounded-md border text-sm">
                  React 19
                </span>
                <span className="px-3 py-1 rounded-md border text-sm">
                  Vite 7
                </span>
                <span className="px-3 py-1 rounded-md border text-sm">
                  TypeScript
                </span>
                <span className="px-3 py-1 rounded-md border text-sm">
                  Tailwind CSS 4
                </span>
                <span className="px-3 py-1 rounded-md border text-sm">
                  Shadcn UI
                </span>
                <span className="px-3 py-1 rounded-md border text-sm">
                  lucide-react
                </span>
                <span className="px-3 py-1 rounded-md border text-sm">
                  sonner
                </span>
                <span className="px-3 py-1 rounded-md border text-sm">
                  NestJS 11
                </span>
                <span className="px-3 py-1 rounded-md border text-sm">
                  MongoDB
                </span>
                <span className="px-3 py-1 rounded-md border text-sm">
                  Jest
                </span>
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
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-3 py-2 rounded-md border"
              >
                <Info className="w-4 h-4" />
                Dashboard
              </Link>
              <Link
                to="/objects"
                className="flex items-center gap-2 px-3 py-2 rounded-md border"
              >
                <Layers className="w-4 h-4" />
                Objetos
              </Link>
              <Link
                to="/classes"
                className="flex items-center gap-2 px-3 py-2 rounded-md border"
              >
                <Layers className="w-4 h-4" />
                Classes
              </Link>
              <Link
                to="/interactions"
                className="flex items-center gap-2 px-3 py-2 rounded-md border"
              >
                <Users className="w-4 h-4" />
                Interações
              </Link>
              <Link
                to="/environments"
                className="flex items-center gap-2 px-3 py-2 rounded-md border"
              >
                <Globe2 className="w-4 h-4" />
                Ambientes
              </Link>
              <Link
                to="/friendships"
                className="flex items-center gap-2 px-3 py-2 rounded-md border"
              >
                <Users className="w-4 h-4" />
                Relações
              </Link>
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
              <a
                href={link}
                target="_blank"
                className="block text-primary underline hover:opacity-80 transition-opacity duration-300 ease-in-out"
              >
                Artigo do modelo VISO na SOL-SBC
              </a>
              <a
                href="https://www.ufpel.edu.br"
                target="_blank"
                className="block text-primary underline hover:opacity-80 transition-opacity duration-300 ease-in-out"
              >
                Universidade Federal de Pelotas (UFPel)
              </a>
              <a
                href="https://github.com/Grazziano/viso-bass-api"
                target="_blank"
                className="block text-primary underline hover:opacity-80 transition-opacity duration-300 ease-in-out"
              >
                Repositório da API do projeto no GitHub
              </a>
              <a
                href="https://github.com/Grazziano/viso-bass-web"
                target="_blank"
                className="block text-primary underline hover:opacity-80 transition-opacity duration-300 ease-in-out"
              >
                Repositório do frontend do projeto no GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/grazziano-fagundes/"
                target="_blank"
                className="block text-primary underline hover:opacity-80 transition-opacity duration-300 ease-in-out"
              >
                Perfil do criador no LinkedIn
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
