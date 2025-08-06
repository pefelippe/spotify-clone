interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

const Card = ({ children, className = "", onClick, hover = false }: CardProps) => {
  const baseClasses = "bg-gray-800 rounded-lg p-4";
  const hoverClasses = hover ? "cursor-pointer hover:scale-105 transition-transform duration-200" : "";
  const clickClasses = onClick ? "cursor-pointer" : "";
  
  const combinedClasses = `${baseClasses} ${hoverClasses} ${clickClasses} ${className}`;

  return (
    <div className={combinedClasses} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card; 