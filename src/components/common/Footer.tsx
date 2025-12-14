import {
  Database,
  FolderKanban,
  Github,
  // Mail,
  ExternalLink,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/', text: 'Dashboard' },
    { path: '/objects', text: 'Objetos' },
    { path: '/classes', text: 'Classes' },
    { path: '/interactions', text: 'Interações' },
    { path: '/environments', text: 'Ambientes ONA' },
    { path: '/friendships', text: 'Relações de amizade' },
    { path: '/about', text: 'Sobre' },
  ];

  const repositoriesAndProjects = [
    {
      icon: Github,
      path: 'https://github.com/Grazziano/viso-bass-api',
      text: 'GitHub API',
    },
    {
      icon: Github,
      path: 'https://github.com/Grazziano/viso-bass-web',
      text: 'GitHub Frontend',
    },
    {
      icon: FolderKanban,
      path: 'https://grazziano.github.io/projetos-siot-ufpel/',
      text: 'Outros projetos',
    },
  ];

  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Logo e descrição */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">VISO-BASS</h3>
                <p className="text-xs text-muted-foreground">Social IoT Data</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Plataforma para visualização e análise de dados de objetos sociais
              da Internet das Coisas.
            </p>
          </div>

          {/* Links rápidos */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold">Links Rápidos</h4>
            <div className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <Link
                  to={link.path}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                >
                  <span>{link.text}</span>
                </Link>
              ))}

              {/* <a
                href="mailto:contato@visobass.com"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
              >
                <Mail className="w-4 h-4" />
                <span>Contato</span>
              </a> */}
            </div>
          </div>

          {/* Repositórios e projetos */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold">Repositórios</h4>
            <div className="flex flex-col gap-2">
              {repositoriesAndProjects.map((item) => (
                <a
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.text}</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright e informações legais */}
        <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground text-center md:text-left">
            © {currentYear} VISO-BASS. Todos os direitos reservados.
          </div>
          <div className="text-xs text-muted-foreground text-center md:text-right">
            Desenvolvido para pesquisa em Social IoT - UFPEL
          </div>
        </div>
      </div>
    </footer>
  );
}
