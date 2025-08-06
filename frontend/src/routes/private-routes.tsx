import { Routes, Route } from 'react-router-dom';

import { Sidebar } from '../components/Sidebar';

import Artistas from "../pages/private/artists";
import Home from "../pages/private/home";
import ArtistaDetalhes from "../pages/private/artists-details";
import Playlists from "../pages/private/playlist";
import Perfil from "../pages/private/profile";

interface ProtectedRouteConfig {
    path: string;
    component: React.ComponentType;
  }

export const privateRoutes: ProtectedRouteConfig[] = [
    { path: '/', component: Home },
    { path: '/artistas', component: Artistas },
    { path: '/artista/:artistId', component: ArtistaDetalhes },
    { path: '/playlists', component: Playlists },
    { path: '/perfil', component: Perfil },
  ];

export const PrivateRoutes: React.FC = () => {
  return (
    <Routes>
      {privateRoutes.map(({ path, component: Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <div className="flex">
              <Sidebar />
              <div className="flex-1 ml-[250px]">
                <Component />
              </div>
            </div>
          }
        />
      ))}
    </Routes>
  );
};
