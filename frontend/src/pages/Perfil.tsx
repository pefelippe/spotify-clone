
import { useNavigate } from 'react-router-dom';
import { CustomButton } from '../components/CustomButton';
import { CenteredLayout } from '../components/CenteredLayout';
import { user } from '../mock';

const Perfil = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <CenteredLayout>
      <div className="text-center">
        <div className="mb-6">
          <img
            src={user.imageUrl}
            alt={user.name}
            className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-gray-800"
          />
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white-text mb-2">
            {user.name}
          </h1>
          <p className="text-gray-400 text-lg">
            {user.email}
          </p>
        </div>

        <CustomButton
          label="Sair"
          onClick={handleLogout}
          variant="primary"
          customClassName="bg-green-spotify hover:bg-green-600 w-full"
        />
      </div>
    </CenteredLayout>
  );
};

export default Perfil;
