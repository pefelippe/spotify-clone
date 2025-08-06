
import CustomButton from '../CustomButton';
import { Logo } from '../Logo';
import { SidebarItems } from './SidebarItems';
import { NavigationButton } from '../NavigationButton';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate(); 
  return (
    <nav className="w-[300px] bg-[#000] h-screen  flex flex-col font-dm-sans">
      <Logo className="w-[200px] h-[70px] object-contain m-8 cursor-pointer" onClick={() => {navigate('/')}} />
      <div className="flex-1">
        <ul className="space-y-1 mx-8">
          {SidebarItems.map((item) => (
            <NavigationButton key={item.name} name={item.name} path={item.path} icon={item.icon} />
          ))}
        </ul>
      </div>
      <div className="mt-auto mx-8">
        <NavigationButton
          name="Instalar PWA"
          icon="⬇️"
          path="/"
        />
      </div>
    </nav>
  );
};

export default Sidebar;
