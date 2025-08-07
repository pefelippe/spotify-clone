import React, { useState, useEffect } from 'react';
import { usePlayer } from '../providers/player-provider';
import { useLikedTracks } from '../providers/liked-tracks-provider';
import { AddToPlaylistModal } from './AddToPlaylistModal';
import { SpotifyIcons } from './SpotifyIcons';

const formatTime = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const MusicPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    position,
    duration,
    playTrack,
    pauseTrack,
    resumeTrack,
    nextTrack,
    previousTrack,
    seekToPosition,
    setVolume,
  } = usePlayer();

  const { isTrackLiked, toggleLikeTrack } = useLikedTracks();

  const [currentPosition, setCurrentPosition] = useState(0);
  const [volume, setVolumeState] = useState(50);
  const [previousVolume, setPreviousVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [isDragging] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(0);
  const [showAddToPlaylistModal, setShowAddToPlaylistModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isDragging) {
      setCurrentPosition(position);
    }
  }, [position, isDragging]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        handlePlayerCollapse();
      }
    };

    if (isExpanded) {
      document.addEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'unset';
    };
  }, [isExpanded]);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const interval = setInterval(() => {
      if (!isDragging) {
        setCurrentPosition(prev => Math.min(prev + 1000, duration));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, duration, isDragging]);

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseTrack();
    } else {
      resumeTrack();
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newPosition = Math.floor(percent * duration);
    setCurrentPosition(newPosition);
    seekToPosition(newPosition);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolumeState(newVolume);
    setVolume(newVolume / 100);

    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const handleMuteToggle = () => {
    if (isMuted) {
      setVolumeState(previousVolume);
      setVolume(previousVolume / 100);
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      setVolumeState(0);
      setVolume(0);
      setIsMuted(true);
    }
  };

  const handleLike = () => {
    if (currentTrack) {
      toggleLikeTrack(currentTrack.id);
    }
  };

  const handleShuffle = () => {
    setShuffle(!shuffle);
  };

  const handleRepeat = () => {
    setRepeat((repeat + 1) % 3);
  };

  const handleArtistClick = (artistId: string) => {
    window.location.href = `/artists/${artistId}`;
  };

  const handlePlayerExpand = () => {
    setIsExpanded(true);
  };

  const handlePlayerCollapse = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsExpanded(false);
      setIsClosing(false);
    }, 200);
  };

  const handlePlayerClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const isLargeScreen = window.innerWidth >= 1024;

    if (isLargeScreen) {
      const isInfoArea = target.closest('.player-info-area');
      const isLikeButton = target.closest('.like-button');
      const isAddButton = target.closest('.add-button');

      if (!isInfoArea && !isLikeButton && !isAddButton) {
        return;
      }
    } else {
      const isControlArea = target.closest('.player-controls');
      if (isControlArea) {
        return;
      }
    }

    handlePlayerExpand();
  };

  if (!currentTrack) {
    return null;
  }

  return (
    <>
      <div
        className={`fixed bottom-0 left-0 right-0 bg-black text-white transition-all duration-300 ease-in-out ${
          isExpanded
            ? 'h-screen z-50'
            : 'h-20 z-40 hover:h-24'
        }`}
        onClick={handlePlayerClick}
      >
        {isExpanded ? (
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handlePlayerCollapse}
                  className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                >
                  <SpotifyIcons name="chevron-down" className="w-6 h-6" />
                </button>
                <div className="w-10 h-10"></div>
                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4">
                    <div className="flex-1 lg:w-2/5">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 lg:w-20 lg:h-20 flex-shrink-0">
                          <img
                            src={currentTrack.album.images[0]?.url || 'https://via.placeholder.com/80x80/333/fff?text=♪'}
                            alt={currentTrack.album.name}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={handleLike}
                              className={`like-button p-1 hover:scale-110 transition-transform ${
                                isTrackLiked(currentTrack.id) ? 'text-green-500' : 'text-gray-400'
                              }`}
                            >
                              <SpotifyIcons name="heart" className="w-5 h-5" />
                            </button>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-sm lg:text-base truncate">
                                {currentTrack.name}
                              </h3>
                              <div className="flex items-center space-x-1 text-xs lg:text-sm text-gray-400">
                                {currentTrack.artists.map((artist, index) => (
                                  <React.Fragment key={artist.uri}>
                                    <button
                                      onClick={() => handleArtistClick(artist.uri.split(':').pop()!)}
                                      className="hover:text-white transition-colors truncate"
                                    >
                                      {artist.name}
                                    </button>
                                    {index < currentTrack.artists.length - 1 && <span>,</span>}
                                  </React.Fragment>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 lg:w-3/5">
                      <div className="flex flex-col items-center space-y-4">
                        <div className="flex items-center space-x-6">
                          <button
                            onClick={handleShuffle}
                            className={`p-2 hover:scale-110 transition-transform ${
                              shuffle ? 'text-green-500' : 'text-gray-400'
                            }`}
                          >
                            <SpotifyIcons name="shuffle" className="w-5 h-5" />
                          </button>
                          <button
                            onClick={previousTrack}
                            className="p-2 hover:scale-110 transition-transform text-gray-400 hover:text-white"
                          >
                            <SpotifyIcons name="previous" className="w-6 h-6" />
                          </button>
                          <button
                            onClick={handlePlayPause}
                            className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"
                          >
                            <SpotifyIcons
                              name={isPlaying ? 'pause' : 'play'}
                              className="w-6 h-6"
                            />
                          </button>
                          <button
                            onClick={nextTrack}
                            className="p-2 hover:scale-110 transition-transform text-gray-400 hover:text-white"
                          >
                            <SpotifyIcons name="next" className="w-6 h-6" />
                          </button>
                          <button
                            onClick={handleRepeat}
                            className={`p-2 hover:scale-110 transition-transform ${
                              repeat > 0 ? 'text-green-500' : 'text-gray-400'
                            }`}
                          >
                            <SpotifyIcons
                              name={repeat === 2 ? 'repeat-one' : 'repeat'}
                              className="w-5 h-5"
                            />
                          </button>
                        </div>
                        <div className="w-full max-w-md">
                          <div className="flex items-center space-x-4">
                            <span className="text-xs text-gray-400 w-12">
                              {formatTime(currentPosition)}
                            </span>
                            <div className="flex-1 relative">
                              <div
                                className="w-full h-1 bg-gray-600 rounded-full cursor-pointer"
                                onClick={handleSeek}
                              >
                                <div
                                  className="h-full bg-white rounded-full relative"
                                  style={{
                                    width: `${(currentPosition / duration) * 100}%`,
                                  }}
                                >
                                  <div className="absolute -right-1 -top-0.5 w-3 h-3 bg-white rounded-full opacity-0 hover:opacity-100 transition-opacity"></div>
                                </div>
                              </div>
                            </div>
                            <span className="text-xs text-gray-400 w-12">
                              {formatTime(duration)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowAddToPlaylistModal(true)}
                  className="add-button p-2 hover:bg-gray-800 rounded-full transition-colors"
                >
                  <SpotifyIcons name="plus" className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="w-64 h-64 lg:w-80 lg:h-80">
                <img
                  src={currentTrack.album.images[0]?.url || 'https://via.placeholder.com/320x320/333/fff?text=♪'}
                  alt={currentTrack.album.name}
                  className="w-full h-full object-cover rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center px-4">
            <div className="flex items-center space-x-4 flex-1">
              <div className="w-12 h-12 flex-shrink-0">
                <img
                  src={currentTrack.album.images[0]?.url || 'https://via.placeholder.com/48x48/333/fff?text=♪'}
                  alt={currentTrack.album.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleLike}
                    className={`like-button p-1 hover:scale-110 transition-transform ${
                      isTrackLiked(currentTrack.id) ? 'text-green-500' : 'text-gray-400'
                    }`}
                  >
                    <SpotifyIcons name="heart" className="w-4 h-4" />
                  </button>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate">{currentTrack.name}</h3>
                    <p className="text-xs text-gray-400 truncate">
                      {currentTrack.artists.map(artist => artist.name).join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-400">
                    {formatTime(currentPosition)}
                  </span>
                  <div className="w-32 h-1 bg-gray-600 rounded-full cursor-pointer" onClick={handleSeek}>
                    <div
                      className="h-full bg-white rounded-full"
                      style={{
                        width: `${(currentPosition / duration) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-400">
                    {formatTime(duration)}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleMuteToggle}
                  className="p-1 hover:scale-110 transition-transform text-gray-400 hover:text-white"
                >
                  <SpotifyIcons
                    name={isMuted ? 'volume-mute' : 'volume'}
                    className="w-4 h-4"
                  />
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, white 0%, white ${volume}%, #4B5563 ${volume}%, #4B5563 100%)`,
                  }}
                />
                <button
                  onClick={() => setShowAddToPlaylistModal(true)}
                  className="add-button p-1 hover:scale-110 transition-transform text-gray-400 hover:text-white"
                >
                  <SpotifyIcons name="plus" className="w-4 h-4" />
                </button>
                <button
                  onClick={handlePlayPause}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <SpotifyIcons
                    name={isPlaying ? 'pause' : 'play'}
                    className="w-5 h-5"
                  />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {showAddToPlaylistModal && (
        <AddToPlaylistModal
          trackId={currentTrack.id}
          onClose={() => setShowAddToPlaylistModal(false)}
        />
      )}
    </>
  );
};
