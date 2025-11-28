import AppRoutes from './routes';
import { Toaster } from './components/ui/sonner';
import AuthProvider from './context/AuthProvider';

function App() {
  return (
    <>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
      <Toaster />
    </>
  );
}

export default App;
