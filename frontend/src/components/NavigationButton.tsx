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
  activeClassName = 'text-white-text bg-gray-800/50',
  inactiveClassName = 'text-[#949EA2] hover:text-white-text hover:bg-gray-800/30',
  baseClassName = 'w-full flex items-center gap-6 px-4 py-3 rounded-lg transition-all duration-200 font-medium text-left cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]',
}: NavigationButtonProps) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  const buttonClasses = `${baseClassName} ${
    isActive ? activeClassName : inactiveClassName
  }`;

  return (
    <Link to={path} className="w-full">
      <button className={buttonClasses}>
        {icon && (
          <span className={`text-2xl transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
            {icon}
          </span>
        )}
        {name && (
          <span className="text-[18px] font-medium">
            {name}
          </span>
        )}
      </button>
    </Link>
  );
};
