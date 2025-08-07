import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuth } from './auth-provider';

interface PlayerContextData {
  player: SpotifyPlayer | null;
  isReady: boolean;
  currentTrack: SpotifyTrack | null;
  isPlaying: boolean;
  position: number;
  duration: number;
  deviceId: string | null;
  isPremiumRequired: boolean;
  resetPremiumWarning: () => void;
  playTrack: (uri: string, contextUri?: string) => Promise<void>;
  pauseTrack: () => Promise<void>;
  resumeTrack: () => Promise<void>;
  nextTrack: () => Promise<void>;
  previousTrack: () => Promise<void>;
  seekToPosition: (position: number) => Promise<void>;
  setVolume: (volume: number) => Promise<void>;
}

const PlayerContext = createContext<PlayerContextData | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const { accessToken } = useAuth();
  const [player, setPlayer] = useState<SpotifyPlayer | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [isPremiumRequired, setIsPremiumRequired] = useState(false);

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    const initializePlayer = () => {
      console.log('🎵 Inicializando Spotify Player...');
      
      const spotifyPlayer = new window.Spotify.Player({
        name: 'Spotify Clone Player',
        getOAuthToken: (cb) => {
          console.log('🔑 Fornecendo token de acesso...');
          cb(accessToken);
        },
        volume: 0.5,
      });

      // Error handling
      spotifyPlayer.addListener('initialization_error', ({ message }) => {
        console.error('❌ Falha ao inicializar player:', message);
      });

      spotifyPlayer.addListener('authentication_error', ({ message }) => {
        console.error('❌ Falha na autenticação:', message);
      });

      spotifyPlayer.addListener('account_error', ({ message }) => {
        console.error('❌ Falha ao validar conta Spotify (precisa ser Premium):', message);
        setIsPremiumRequired(true);
      });

      spotifyPlayer.addListener('playback_error', ({ message }) => {
        console.error('❌ Erro de reprodução:', message);
      });

      // Playback status updates
      spotifyPlayer.addListener('player_state_changed', (state) => {
        if (!state) {
          return;
        }

        setCurrentTrack(state.track_window.current_track);
        setIsPlaying(!state.paused);
        setPosition(state.position);
        setDuration(state.track_window.current_track.duration_ms);
      });

      // Ready
      spotifyPlayer.addListener('ready', ({ device_id }) => {
        console.log('✅ Player pronto! Device ID:', device_id);
        setDeviceId(device_id);
        setIsReady(true);
      });

      // Not Ready
      spotifyPlayer.addListener('not_ready', ({ device_id }) => {
        console.log('❌ Device ID offline:', device_id);
        setIsReady(false);
      });

      // Connect to the player!
      console.log('🔗 Conectando ao player...');
      spotifyPlayer.connect().then(success => {
        if (success) {
          console.log('✅ Conectado com sucesso ao Spotify Web Playback SDK');
        } else {
          console.error('❌ Falha ao conectar ao Spotify Web Playback SDK');
        }
      });
      setPlayer(spotifyPlayer);
    };

    // Wait for SDK to load
    if (window.Spotify) {
      initializePlayer();
    } else {
      window.onSpotifyWebPlaybackSDKReady = initializePlayer;
    }

    return () => {
      if (player) {
        player.disconnect();
      }
    };
  }, [accessToken]);

  const playTrack = async (uri: string, contextUri?: string) => {
    console.log('🎵 Tentando tocar música:', { uri, contextUri, deviceId, hasToken: !!accessToken });
    
    if (!deviceId || !accessToken) {
      console.error('❌ Device ID ou Access Token não disponível:', { deviceId, hasToken: !!accessToken });
      return;
    }

    const body = contextUri 
      ? { context_uri: contextUri, offset: { uri } }
      : { uris: [uri] };

    console.log('🎵 Enviando request para Spotify API:', body);

    try {
      const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('❌ Erro na resposta da API:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        
        if (response.status === 403) {
          console.error('❌ Erro 403: Você precisa ter Spotify Premium para usar o Web Playback SDK');
          setIsPremiumRequired(true);
        }
      } else {
        console.log('✅ Música enviada com sucesso para reprodução');
      }
    } catch (error) {
      console.error('❌ Erro ao tocar música:', error);
    }
  };

  const resetPremiumWarning = () => {
    setIsPremiumRequired(false);
  };

  const pauseTrack = async () => {
    if (player) {
      await player.pause();
    }
  };

  const resumeTrack = async () => {
    if (player) {
      await player.resume();
    }
  };

  const nextTrack = async () => {
    if (player) {
      await player.nextTrack();
    }
  };

  const previousTrack = async () => {
    if (player) {
      await player.previousTrack();
    }
  };

  const seekToPosition = async (position: number) => {
    if (player) {
      await player.seek(position);
    }
  };

  const setVolume = async (volume: number) => {
    if (player) {
      await player.setVolume(volume);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        player,
        isReady,
        currentTrack,
        isPlaying,
        position,
        duration,
        deviceId,
        isPremiumRequired,
        resetPremiumWarning,
        playTrack,
        pauseTrack,
        resumeTrack,
        nextTrack,
        previousTrack,
        seekToPosition,
        setVolume,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = (): PlayerContextData => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer deve estar dentro de PlayerProvider');
  }
  return context;
};