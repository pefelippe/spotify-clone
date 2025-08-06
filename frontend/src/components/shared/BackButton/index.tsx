import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  to?: string;
  className?: string;
  children?: React.ReactNode;
}

const BackButton = ({ to, className = "", children = "← Voltar" }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button 
      onClick={handleClick}
      className={`text-white-text hover:text-gray-300 transition-colors text-lg ${className}`}
    >
      {children}
    </button>
  );
};

export default BackButton; 