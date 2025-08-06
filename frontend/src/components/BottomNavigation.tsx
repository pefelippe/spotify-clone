import { NavigationButton } from './NavigationButton';
import { usePWA } from '../hooks/usePWA';
import { SidebarItems } from './Sidebar';

export const BottomNavigation = () => {
  const { installApp } = usePWA();

  const handleInstallClick = async () => {
    await installApp();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black-bg border-t border-gray-800 lg:hidden z-50">
      <div className="flex justify-around items-center py-3 px-4">
        {SidebarItems.map((item) => (
          <div key={item.name} className="flex flex-col items-center min-w-[60px]">
            <NavigationButton
              name=""
              path={item.path}
              icon={item.icon}
              baseClassName="flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 cursor-pointer transform hover:scale-110 active:scale-95 hover:bg-gray-800/30"
              activeClassName="text-green-spotify bg-green-spotify/10 scale-105"
              inactiveClassName="text-[#949EA2] hover:text-white-text"
            />
            <span className="text-xs text-[#949EA2] mt-2 font-medium">{item.name}</span>
          </div>
        ))}
        <div className="flex flex-col items-center min-w-[60px]">
          <button
            onClick={handleInstallClick}
            className="flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 cursor-pointer transform hover:scale-110 active:scale-95 text-[#949EA2] hover:text-white-text hover:bg-gray-800/30"
            aria-label="Instalar PWA"
          >
            <span className="text-2xl">⬇️</span>
          </button>
          <span className="text-xs text-[#949EA2] mt-2 font-medium">PWA</span>
        </div>
      </div>
    </div>
  );
};