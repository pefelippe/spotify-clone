import { useState } from 'react';

export const useAutentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSpotifyLogin = () => {
    console.log('Spotify login clicked');
  };

  return { handleSpotifyLogin, isAuthenticated };
};
