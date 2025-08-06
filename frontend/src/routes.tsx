import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import Artistas from './pages/Artistas';
import ArtistaDetalhes from './pages/ArtistaDetalhes';
import Playlists from './pages/Playlists';
import Perfil from './pages/Perfil';

interface RouteConfig {
  path: string;
  element: React.ReactNode;
}

interface ProtectedRouteConfig {
  path: string;
  component: React.ComponentType;
}

const protectedRoutes: ProtectedRouteConfig[] = [
  { path: '/', component: Home },
  { path: '/artistas', component: Artistas },
  { path: '/artista/:artistId', component: ArtistaDetalhes },
  { path: '/playlists', component: Playlists },
  { path: '/perfil', component: Perfil },
];

const publicRoutes: RouteConfig[] = [
  {
    path: '/login',
    element: <Login />,
  },
];

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        {protectedRoutes.map(({ path, component: Component }) => (
          <Route
            key={path}
            path={path}
            element={<Component />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
