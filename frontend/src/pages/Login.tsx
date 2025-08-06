import { CustomButton } from '../components/CustomButton';
import { Logo } from '../components/Logo';
import { CenteredLayout } from '../components/CenteredLayout';
import { useAutentication } from '../hooks/useAutentication';

const Login = () => {
  const { handleSpotifyLogin } = useAutentication();

  return (
    <CenteredLayout>
      <div className="flex flex-col items-center text-center">
        <Logo className="w-[200px] h-[60px] object-contain mb-6" />
        <p className="text-white-text text-xl font-medium font-weight-500 ">Entra com sua conta Spotify clicando no botão abaixo</p>;
        <CustomButton
          onClick={handleSpotifyLogin}
          variant="spotify"
          label="Entrar"
        />
      </div>
    </CenteredLayout>
  );
};

export default Login;
