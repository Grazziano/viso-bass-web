import About from '@/pages/About';
import Classes from '@/pages/Classes';
import Dashboard from '@/pages/Dashboard';
import Environments from '@/pages/Environments';
import EnvironmentDetail from '@/pages/EnvironmentDetail';
import Friendships from '@/pages/Friendships';
import Interactions from '@/pages/Interactions';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Objects from '@/pages/Objects';
import Register from '@/pages/Register';
import { Routes, Route, Navigate } from 'react-router-dom';
import RequireAuth from './RequireAuth';
import RequireAdmin from './RequireAdmin';
import GuestOnly from './GuestOnly';
import AdminUsers from '@/pages/AdminUsers';
import Account from '@/pages/Account';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route
        path="/login"
        element={
          <GuestOnly>
            <Login />
          </GuestOnly>
        }
      />
      <Route
        path="/register"
        element={
          <GuestOnly>
            <Register />
          </GuestOnly>
        }
      />
      <Route
        path="/admin/users"
        element={
          <RequireAdmin>
            <AdminUsers />
          </RequireAdmin>
        }
      />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/objects"
        element={
          <RequireAuth>
            <Objects />
          </RequireAuth>
        }
      />
      <Route
        path="/classes"
        element={
          <RequireAuth>
            <Classes />
          </RequireAuth>
        }
      />
      <Route
        path="/interactions"
        element={
          <RequireAuth>
            <Interactions />
          </RequireAuth>
        }
      />
      <Route
        path="/environments"
        element={
          <RequireAuth>
            <Environments />
          </RequireAuth>
        }
      />
      <Route
        path="/environments/:id"
        element={
          <RequireAuth>
            <EnvironmentDetail />
          </RequireAuth>
        }
      />
      <Route
        path="/friendships"
        element={
          <RequireAuth>
            <Friendships />
          </RequireAuth>
        }
      />
      <Route
        path="/about"
        element={
          <RequireAuth>
            <About />
          </RequireAuth>
        }
      />
      <Route
        path="/account"
        element={
          <RequireAuth>
            <Account />
          </RequireAuth>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
