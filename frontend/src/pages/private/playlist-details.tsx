import { useParams } from 'react-router-dom';
import { BackButton } from '../../components/BackButton';
import { QueryState } from '../../components/QueryState';
import { TrackList } from '../../components/TrackList';
import { usePlaylistDetails, usePlaylistTracks } from '../../hooks/usePlaylistDetails';

const PlaylistDetalhes = () => {
  const { playlistId } = useParams();
  const { data: playlistDetails, isLoading: isLoadingDetails, error: detailsError } = usePlaylistDetails(playlistId!);
  const { 
    data: tracksData, 
    isLoading: isLoadingTracks, 
    error: tracksError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage 
  } = usePlaylistTracks(playlistId!);

  if (!playlistId) {
    return (
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-8">
          <BackButton artistName="Playlist não encontrada" />
          <h1 className="text-2xl font-bold text-white-text">Playlist não encontrada</h1>
        </div>
      </div>
    );
  }

  if (isLoadingDetails || detailsError) {
    return (
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-8">
          <BackButton artistName={isLoadingDetails ? "Carregando..." : "Erro"} />
          <h1 className="text-2xl font-bold text-white-text">
            {isLoadingDetails ? 'Carregando playlist...' : 'Erro ao carregar playlist'}
          </h1>
        </div>
        <QueryState
          isLoading={isLoadingDetails}
          error={detailsError}
          loadingMessage=""
          errorMessage="Tente novamente mais tarde."
          centered={false}
        />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center space-x-4 mb-8">
        <BackButton artistName={playlistDetails.name} />
      </div>

      {/* Playlist Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end space-y-6 md:space-y-0 md:space-x-6 mb-8">
        <img
          src={playlistDetails.images?.[0]?.url || 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36'}
          alt={playlistDetails.name}
          className="w-48 h-48 rounded-lg object-cover shadow-2xl"
        />
        <div className="flex-1">
          <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">
            Playlist
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white-text mb-4">
            {playlistDetails.name}
          </h1>
          {playlistDetails.description && (
            <p className="text-gray-400 text-sm mb-4 max-w-2xl">
              {playlistDetails.description}
            </p>
          )}
          <div className="flex flex-wrap items-center text-gray-400 text-sm space-x-1">
            <span className="font-medium text-white-text">
              {playlistDetails.owner?.display_name}
            </span>
            {playlistDetails.followers?.total && (
              <>
                <span>•</span>
                <span>{playlistDetails.followers.total.toLocaleString()} seguidores</span>
              </>
            )}
            <span>•</span>
            <span>{playlistDetails.tracks?.total} músicas</span>
          </div>
        </div>
      </div>

      {/* Tracks */}
      <div>
        {isLoadingTracks ? (
          <QueryState
            isLoading={true}
            loadingMessage="Carregando músicas..."
            centered={false}
          />
        ) : tracksError ? (
          <QueryState
            error={tracksError}
            errorMessage="Erro ao carregar músicas."
            centered={false}
          />
        ) : (
          <TrackList
            data={tracksData}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
            isPlaylist={true}
          />
        )}
      </div>
    </div>
  );
};

export default PlaylistDetalhes;