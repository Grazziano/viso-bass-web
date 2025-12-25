import type { ReactNode } from 'react';
import Header from '../common/Header';
import Navigation from '../common/Navigation';
import Footer from '../common/Footer';
import { TooltipProvider } from '../ui/tooltip';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <Navigation />

      {/* Main Content */}
      <TooltipProvider delayDuration={0}>
        <main className="container mx-auto px-4 py-8 flex-1">{children}</main>
      </TooltipProvider>

      <Footer />
    </div>
  );
}
