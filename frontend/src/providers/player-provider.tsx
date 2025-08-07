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
    if (!accessToken) return;

    const initializePlayer = () => {
      const spotifyPlayer = new window.Spotify.Player({
        name: 'Spotify Clone Player',
        getOAuthToken: (cb) => {
          cb(accessToken);
        },
        volume: 0.5,
      });

      spotifyPlayer.addListener('initialization_error', ({ message }) => {
        console.error('❌ Falha ao inicializar player:', message);
      });

      spotifyPlayer.addListener('authentication_error', ({ message }) => {
        console.error('❌ Falha na autenticação:', message);
      });

      spotifyPlayer.addListener('account_error', () => {
        setIsPremiumRequired(true);
      });

      spotifyPlayer.addListener('playback_error', ({ message }) => {
        console.error('❌ Erro de reprodução:', message);
      });

      spotifyPlayer.addListener('player_state_changed', (state) => {
        if (!state) {
          return;
        }

        setCurrentTrack(state.track_window.current_track);
        setIsPlaying(!state.paused);
        setPosition(state.position);
        setDuration(state.track_window.current_track.duration_ms);
      });

      spotifyPlayer.addListener('ready', ({ device_id }) => {
        setDeviceId(device_id);
        setIsReady(true);
      });

      spotifyPlayer.addListener('not_ready', ({ device_id }) => {
        setIsReady(false);
      });

      spotifyPlayer.connect().then(success => {
        if (!success) {
          console.error('❌ Falha ao conectar ao Spotify Web Playback SDK');
        }
      });
      setPlayer(spotifyPlayer);
    };

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
    if (!deviceId || !accessToken) {
      return;
    }

    let body: any;

    if (contextUri) {
      if (contextUri.startsWith('spotify:artist:')) {
        body = { context_uri: contextUri };
      } else if (!uri || uri.trim() === '') {
        body = { context_uri: contextUri };
      } else {
        body = { context_uri: contextUri, offset: { uri } };
      }
    } else {
      body = { uris: [uri] };
    }

    try {
      const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Erro na resposta da API:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData,
        });

        if (response.status === 403) {
          console.error('❌ Erro 403: Você precisa ter Spotify Premium para usar o Web Playback SDK');
          setIsPremiumRequired(true);
        }
      }
    } catch (error) {
      console.error('❌ Erro ao tocar música:', error);
    }
  };

  const resetPremiumWarning = () => {
    setIsPremiumRequired(false);
  };

  const pauseTrack = async () => {
    if (player && isReady) {
      await player.pause();
    }
  };

  const resumeTrack = async () => {
    if (player && isReady) {
      await player.resume();
    }
  };

  const nextTrack = async () => {
    if (player && isReady) {
      await player.nextTrack();
    }
  };

  const previousTrack = async () => {
    if (player && isReady) {
      await player.previousTrack();
    }
  };

  const seekToPosition = async (position: number) => {
    if (player && isReady) {
      await player.seek(position);
    }
  };

  const setVolume = async (volume: number) => {
    if (player && isReady) {
      await player.setVolume(volume);
    }
  };

  const value: PlayerContextData = {
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
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = (): PlayerContextData => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
