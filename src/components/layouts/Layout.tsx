import type { ReactNode } from 'react';
import Header from '../common/Header';
import Navigation from '../common/Navigation';
import Footer from '../common/Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <Navigation />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-1">{children}</main>

      <Footer />
    </div>
  );
}
