import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowLeft, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-background via-background to-primary/5">
      <div className="relative text-center px-4 max-w-2xl mx-auto">
        {/* Decorative background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
            <div className="relative bg-linear-to-br bg-primary/20 from-primary/20 to-accent/20 p-6 rounded-full border border-primary shadow-lg">
              <AlertTriangle className="w-16 h-16 text-primary" />
            </div>
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="mb-4 text-8xl font-bold bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-primary animate-pulse">
          404
        </h1>

        {/* Message */}
        <h2 className="mb-3 text-2xl font-semibold text-muted-foreground">
          Página Não Encontrada
        </h2>
        <p className="mb-8 text-muted-foreground max-w-md mx-auto">
          A página que você está procurando não existe ou foi movida. Verifique
          a URL ou retorne à página inicial.
        </p>

        {/* Route info */}
        <div className="mb-8 p-4 bg-muted/50 border border-border rounded-lg backdrop-blur-sm">
          <p className="text-sm text-muted-foreground">
            Rota solicitada:{' '}
            <code className="px-2 py-1 bg-background/50 rounded text-primary font-mono">
              {location.pathname}
            </code>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          <Link to="/login">
            <Button className="gap-2 w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
              <Home className="w-4 h-4" />
              Página Inicial
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
