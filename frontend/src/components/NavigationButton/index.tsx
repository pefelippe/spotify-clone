import { Link, useLocation } from 'react-router-dom';

interface NavigationButtonProps {
  name: string;
  path?: string;
  icon: string;
  activeClassName?: string;
  inactiveClassName?: string;
  baseClassName?: string;
}

export const NavigationButton = ({ 
  name, 
  icon, 
  path = '/', 
  activeClassName = 'text-white-text',
  inactiveClassName = 'text-[#949EA2] hover:text-white-text',
  baseClassName = 'w-full flex items-center gap-6 px-2 py-3 rounded-md transition-colors duration-200 font-medium text-left cursor-pointer'
}: NavigationButtonProps) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  const buttonClasses = `${baseClassName} ${
    isActive ? activeClassName : inactiveClassName
  }`;

  return (
    <Link to={path} className="w-full">
      <button className={buttonClasses}>
        {icon && <span className="text-3xl">{icon}</span>}
        <span className="text-[24px] font-light">
          {name}
        </span>
      </button>
    </Link>
  );
};
