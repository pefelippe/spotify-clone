import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { CustomButton } from '../../components/CustomButton';
import { Modal } from '../../components/CustomModal';
import { PageHeader } from '../../components/layout/PageHeader';
import { PageWithQueryState } from '../../components/PageWithQueryState';
import { InfiniteScrollList } from '../../components/InfiniteScrollList';
import { useUserPlaylists } from '../../hooks/useUserPlaylists';
import { usePlayer } from '../../providers/player-provider';
import PlaylistItem from '../../components/PlaylistItem';

const Playlists = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { playTrack } = usePlayer();
  const { 
    data, 
    isLoading, 
    error, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useUserPlaylists();

  const allPlaylists = useMemo(() => {
    return data?.pages.flatMap(page => page.items) || [];
  }, [data]);

  const handleCreatePlaylist = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePlaylistClick = (playlistId: string) => {
    navigate(`/playlist/${playlistId}`);
  };

  const handlePlaylistPlay = (playlistId: string) => {
    const contextUri = `spotify:playlist:${playlistId}`;
    console.log('🎵 Tentando tocar playlist:', { playlistId, contextUri });
    playTrack('', contextUri);
  };

  const pageHeader = (
    <PageHeader
      title="Minhas Playlists"
      subtitle="Sua coleção pessoal de playlists"
    >
      <CustomButton
        label="Criar Playlist"
        onClick={handleCreatePlaylist}
        variant="primary"
        customClassName="bg-green-spotify hover:bg-green-600"
      />
    </PageHeader>
  );

  if (isLoading || error) {
    return (
      <PageWithQueryState
        isLoading={isLoading}
        error={error}
        loadingMessage="Carregando playlists..."
        errorMessage="Erro ao carregar playlists. Tente novamente."
        headerContent={pageHeader}
      />
    );
  }

  const renderPlaylistItem = (playlist: any) => (
    <PlaylistItem
      name={playlist.name}
      imageUrl={playlist.images?.[0]?.url}
      ownerName={playlist.owner.display_name}
      playlistId={playlist.id}
      onClick={() => handlePlaylistClick(playlist.id)}
      onPlay={() => handlePlaylistPlay(playlist.id)}
    />
  );

  return (
    <div className="w-full p-6">
      {pageHeader}

      <InfiniteScrollList
        items={allPlaylists}
        renderItem={renderPlaylistItem}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        className="flex flex-col space-y-4"
        itemClassName=""
        emptyComponent={
          <div className="text-center py-12 text-gray-400 col-span-full">
            Nenhuma playlist encontrada.
          </div>
        }
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Criar Nova Playlist"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nome da Playlist
            </label>
            <input
              type="text"
              placeholder="Digite o nome da playlist..."
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white-text placeholder-gray-400 focus:outline-none focus:border-green-spotify"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Descrição (opcional)
            </label>
            <textarea
              placeholder="Descreva sua playlist..."
              rows={3}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white-text placeholder-gray-400 focus:outline-none focus:border-green-spotify resize-none"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <CustomButton
              label="Cancelar"
              onClick={handleCloseModal}
              variant="outline"
              customClassName="flex-1"
            />
            <CustomButton
              label="Criar"
              onClick={() => {
                // TODO: Implement playlist creation
                handleCloseModal();
              }}
              variant="primary"
              customClassName="flex-1 bg-green-spotify hover:bg-green-600"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Playlists;
