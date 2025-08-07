
import { CustomButton } from './CustomButton';
import { Logo } from './Logo';
import { NavigationButton } from './NavigationButton';
import { HomeIcon, ArtistIcon, PlaylistIcon, UserIcon, DownloadIcon } from './SpotifyIcons';
import { usePWA } from '../hooks/usePWA';

export const SidebarItems = [
  { name: 'Home', path: '/', icon: HomeIcon },
  { name: 'Artistas', path: '/artistas', icon: ArtistIcon },
  { name: 'Playlists', path: '/playlists', icon: PlaylistIcon },
  { name: 'Perfil', path: '/perfil', icon: UserIcon },
];

export const Sidebar = () => {
  const { installApp } = usePWA();

  const handleInstallClick = async () => {
    await installApp();
  };

  return (
    <div className="w-[280px] fixed top-0 left-0 h-screen flex-col hidden lg:flex animate-slide-in-left border-r border-gray-800/50" style={{ backgroundColor: '#000000' }}>
      {/* Top section with logo */}
      <div className="p-6 border-b border-gray-800/30">
        <Logo className="w-[140px] h-[42px] object-contain" />
      </div>

      {/* Navigation section */}
      <div className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {SidebarItems.map((item) => (
            <NavigationButton 
              key={item.name} 
              name={item.name} 
              path={item.path} 
              icon={item.icon}
              baseClassName="w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ease-out font-medium text-left cursor-pointer group"
              activeClassName="text-white-text bg-gray-800/60 shadow-sm"
              inactiveClassName="text-gray-400 hover:text-white-text hover:bg-gray-800/30"
            />
          ))}
        </nav>
      </div>

      {/* Bottom section */}
      <div className="p-6 border-t border-gray-800/30">
        <CustomButton
          label="Instalar App"
          icon={<DownloadIcon size={18} />}
          onClick={handleInstallClick}
          variant="pwa"
          className="w-full justify-center"
        />
      </div>
    </div>
  );
};
