import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Objects from '../pages/Objects';
import Classes from '../pages/Classes';
import Interactions from '../pages/Interactions';
import Environments from '../pages/Environments';
import Friendships from '../pages/Friendships';
import About from '../pages/About';
import NotFound from '../pages/NotFound';
import Login from '../pages/Login';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/objects" element={<Objects />} />
      <Route path="/classes" element={<Classes />} />
      <Route path="/interactions" element={<Interactions />} />
      <Route path="/environments" element={<Environments />} />
      <Route path="/friendships" element={<Friendships />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
