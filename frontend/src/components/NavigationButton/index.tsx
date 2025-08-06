import { Link, useLocation } from 'react-router-dom';

interface NavigationButtonProps {
  name: string;
  path: string;
  icon: string;
  activeClassName?: string;
  inactiveClassName?: string;
  baseClassName?: string;
}

export const NavigationButton = ({ 
  name, 
  path, 
  icon, 
  activeClassName = 'text-white-text',
  inactiveClassName = 'text-gray-300 hover:text-white-text',
  baseClassName = 'w-full flex items-center gap-4 px-2 py-3 rounded-md transition-colors duration-200 font-medium text-left cursor-pointer'
}: NavigationButtonProps) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  const buttonClasses = `${baseClassName} ${
    isActive ? activeClassName : inactiveClassName
  }`;

  return (
    <Link to={path} className="w-full">
      <button className={buttonClasses}>
        <span className="text-xl">
          {icon}
        </span>
        <span className="text-base font-bold">
          {name}
        </span>
      </button>
    </Link>
  );
};
