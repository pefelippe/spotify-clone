import React, { useState, useEffect } from 'react';
import { useUserPlaylists } from '../hooks/useUserPlaylists';
import { useAddToPlaylist } from '../hooks/useAddToPlaylist';
import { CustomModal } from './CustomModal';
import { SpotifyIcons } from './SpotifyIcons';

interface AddToPlaylistModalProps {
  trackId: string;
  onClose: () => void;
}

export const AddToPlaylistModal: React.FC<AddToPlaylistModalProps> = ({
  trackId,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: playlistsData, isLoading } = useUserPlaylists();
  const { mutate: addToPlaylist, isPending } = useAddToPlaylist();

  const allPlaylists = playlistsData?.pages.flatMap(page => page.items) || [];

  const filteredPlaylists = allPlaylists.filter(playlist =>
    playlist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setSearchTerm('');
  }, [trackId]);

  const handleAddToPlaylist = (playlistId: string) => {
    addToPlaylist(
      { playlistId, trackIds: [trackId] },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <CustomModal
      isOpen={true}
      onClose={onClose}
      title="Adicionar à playlist"
    >
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar playlists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <SpotifyIcons
            name="search"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
          />
        </div>

        <div className="max-h-64 overflow-y-auto space-y-2">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
            </div>
          ) : filteredPlaylists.length > 0 ? (
            filteredPlaylists.map((playlist) => (
              <button
                key={playlist.id}
                onClick={() => handleAddToPlaylist(playlist.id)}
                disabled={isPending}
                className="w-full flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
              >
                <img
                  src={playlist.images?.[0]?.url || 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36'}
                  alt={playlist.name}
                  className="w-12 h-12 rounded object-cover"
                />
                <div className="flex-1 text-left">
                  <h3 className="font-medium text-white">{playlist.name}</h3>
                  <p className="text-sm text-gray-400">
                    {playlist.tracks?.total || 0} músicas
                  </p>
                </div>
                {isPending && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-500"></div>
                )}
              </button>
            ))
          ) : (
            <div className="text-center py-8 text-gray-400">
              {searchTerm ? 'Nenhuma playlist encontrada' : 'Nenhuma playlist disponível'}
            </div>
          )}
        </div>
      </div>
    </CustomModal>
  );
};
