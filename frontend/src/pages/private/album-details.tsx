import { useParams } from 'react-router-dom';
import { BackButton } from '../../components/BackButton';
import { QueryState } from '../../components/QueryState';
import { TrackList } from '../../components/TrackList';
import { useAlbumDetails, useAlbumTracks } from '../../hooks/useAlbumDetails';

const AlbumDetalhes = () => {
  const { albumId } = useParams();
  const { data: albumDetails, isLoading: isLoadingDetails, error: detailsError } = useAlbumDetails(albumId!);
  const { 
    data: tracksData, 
    isLoading: isLoadingTracks, 
    error: tracksError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage 
  } = useAlbumTracks(albumId!);

  if (!albumId) {
    return (
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-8">
          <BackButton artistName="Álbum não encontrado" />
          <h1 className="text-2xl font-bold text-white-text">Álbum não encontrado</h1>
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
            {isLoadingDetails ? 'Carregando álbum...' : 'Erro ao carregar álbum'}
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
        <BackButton artistName={albumDetails.name} />
      </div>

      {/* Album Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end space-y-6 md:space-y-0 md:space-x-6 mb-8">
        <img
          src={albumDetails.images?.[0]?.url || ''}
          alt={albumDetails.name}
          className="w-48 h-48 rounded-lg object-cover shadow-2xl"
        />
        <div className="flex-1">
          <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">
            {albumDetails.album_type}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white-text mb-4">
            {albumDetails.name}
          </h1>
          <div className="flex flex-wrap items-center text-gray-400 text-sm space-x-1">
            <span className="font-medium text-white-text">
              {albumDetails.artists?.[0]?.name}
            </span>
            <span>•</span>
            <span>{formatDate(albumDetails.release_date)}</span>
            <span>•</span>
            <span>{albumDetails.total_tracks} músicas</span>
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
            isPlaylist={false}
          />
        )}
      </div>
    </div>
  );
};

export default AlbumDetalhes;