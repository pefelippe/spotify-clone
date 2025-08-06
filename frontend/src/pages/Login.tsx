import spotifyLogo from '../assets/spotify-logo.png';
import CustomButton from '../components/CustomButton';

const Login = () => {
  const handleSpotifyLogin = () => {
    // TODO: Implement Spotify OAuth login
    console.log('Spotify login clicked');
  };

  return (
    <div className="rounded-lg text-center flex flex-col items-center justify-center">
      <img
        src={spotifyLogo}
        alt="Spotify"
        className="mx-auto mb-4 w-[164px] h-[49px] object-contain"
      />

      <h2 className="text-white-text text-lg font-medium font-weight-500 line-height-[20px] tracking-[0.01em] mb-4">
          Entra com sua conta Spotify clicando no botão abaixo
      </h2>


      <CustomButton
        onClick={handleSpotifyLogin}
        label="Entrar"
      />
    </div>
  );
};

export default Login;
