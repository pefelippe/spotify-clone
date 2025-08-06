import CustomButton from '../components/CustomButton';
import { CustomLabel } from '../components/CustomLabel';
import { Logo } from '../components/Logo';
import { CenteredLayout } from '../components/shared';

const Login = () => {
  const handleSpotifyLogin = () => {
    console.log('Spotify login clicked');
  };

  return (
    <CenteredLayout>
      <div className="text-center">
        <Logo className="w-[200px] h-[60px] object-contain mb-6" />
        <CustomLabel label="Entra com sua conta Spotify clicando no botão abaixo" />
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
