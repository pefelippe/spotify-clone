
import { CustomButton } from './CustomButton';
import { Logo } from './Logo';
import { NavigationButton } from './NavigationButton';
import { usePWA } from '../hooks/usePWA';

export const SidebarItems = [
  { name: 'Home', path: '/', icon: '🏠' },
  { name: 'Artistas', path: '/artistas', icon: '🎯' },
  { name: 'Playlists', path: '/playlists', icon: '▶️' },
  { name: 'Perfil', path: '/perfil', icon: '👤' },
];

export const Sidebar = () => {
  const { installApp } = usePWA();

  const handleInstallClick = async () => {
    await installApp();
  };

  return (
    <div className=" fixed top-0 left-0 bg-black-bg h-screen p-6 flex-col hidden lg:flex">
      <Logo className="w-[200px] h-[70px] object-contain mb-8" />

      <ul className="space-y-1 flex-1">
        {SidebarItems.map((item) => (
          <NavigationButton key={item.name} name={item.name} path={item.path} icon={item.icon} />
        ))}
      </ul>

      <CustomButton
        label="Instalar PWA"
        icon="⬇️"
        onClick={handleInstallClick}
        variant="pwa"
      />
    </div>
  );
};
