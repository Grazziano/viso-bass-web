import AppRoutes from './routes';
import { Toaster } from './components/ui/sonner';
import AuthProvider from './context/AuthProvider';
import { ThemeProvider } from './components/providers/theme-provider';
import { ChartsProvider } from './context/ChartsProvider';

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <ChartsProvider>
            <AppRoutes />
          </ChartsProvider>
        </AuthProvider>
      </ThemeProvider>
      <Toaster />
    </>
  );
}

export default App;
