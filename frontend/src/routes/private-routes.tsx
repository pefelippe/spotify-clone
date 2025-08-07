import { Routes, Route } from 'react-router-dom';

import { Sidebar } from '../components/Sidebar';
import { MobileHeader } from '../components/MobileHeader';
import { BottomNavigation } from '../components/BottomNavigation';

import Artistas from "../pages/private/artists";
import Home from "../pages/private/home";
import ArtistaDetalhes from "../pages/private/artists-details";
import Playlists from "../pages/private/playlist";
import Perfil from "../pages/private/profile";
import AlbumDetalhes from "../pages/private/album-details";
import PlaylistDetalhes from "../pages/private/playlist-details";
import UserProfile from "../pages/private/user-profile";

interface ProtectedRouteConfig {
    path: string;
    component: React.ComponentType;
  }

export const privateRoutes: ProtectedRouteConfig[] = [
    { path: '/', component: Home },
    { path: '/artistas', component: Artistas },
    { path: '/artista/:artistId', component: ArtistaDetalhes },
    { path: '/album/:albumId', component: AlbumDetalhes },
    { path: '/playlists', component: Playlists },
    { path: '/playlist/:playlistId', component: PlaylistDetalhes },
    { path: '/perfil', component: Perfil },
    { path: '/user/:userId', component: UserProfile },
  ];

export const PrivateRoutes: React.FC = () => {
  return (
    <>
      <MobileHeader />
      <Sidebar />
      <Routes>
        {privateRoutes.map(({ path, component: Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <div className="flex-1 lg:ml-[280px] pt-16 lg:pt-0 pb-[164px] lg:pb-20">
                <Component />
              </div>
            }
          />
        ))}
      </Routes>
      <BottomNavigation />
    </>
  );
};
