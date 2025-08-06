
import { useParams, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

import Album from '../../components/Album';
import { BackButton } from '../../components/BackButton';
import { QueryState } from '../../components/QueryState';
import { InfiniteScrollList } from '../../components/InfiniteScrollList';
import { useArtistAlbums } from '../../hooks/useArtistAlbums';

const ArtistaDetalhes = () => {
  const { artistId } = useParams();
  const navigate = useNavigate();
  const { 
    data, 
    isLoading, 
    error, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useArtistAlbums(artistId!);

  // Always call hooks in the same order - before any conditional returns
  const allAlbums = useMemo(() => {
    return data?.pages.flatMap(page => page.items) || [];
  }, [data]);

  const artistName = allAlbums[0]?.artists?.[0]?.name || 'Artista';

  const handleAlbumClick = (albumId: string) => {
    navigate(`/album/${albumId}`);
  };

  if (!artistId) {
    return (
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-8">
          <BackButton artistName="Artista não encontrado" />
          <h1 className="text-2xl font-bold text-white-text">Artista não encontrado</h1>
        </div>
      </div>
    );
  }

  const backButtonHeader = (
    <div className="flex items-center space-x-4 mb-8">
      <BackButton artistName="Artista não encontrado" />
      <h1 className="text-2xl font-bold text-white-text">
        {isLoading ? 'Carregando artista...' : 'Erro ao carregar artista'}
      </h1>
    </div>
  );

  if (isLoading || error) {
    return (
      <div className="p-6">
        {backButtonHeader}
        <QueryState
          isLoading={isLoading}
          error={error}
          loadingMessage=""
          errorMessage="Tente novamente mais tarde."
          centered={false}
        />
      </div>
    );
  }

  const renderAlbumItem = (album: any) => (
    <Album
      name={album.name}
      imageUrl={album.images?.[0]?.url || ''}
      size="md"
      onClick={() => handleAlbumClick(album.id)}
    />
  );

  return (
    <div className="p-6">
      <div className="flex items-center space-x-4 mb-8">
        <BackButton artistName={artistName} />
      </div>

      <div className="flex items-center space-x-6 mb-8">
        <img
          src={allAlbums[0]?.images?.[0]?.url || ''}
          alt={artistName}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h2 className="text-3xl font-bold text-white-text mb-2">{artistName}</h2>
          <p className="text-gray-400">{allAlbums.length} álbuns</p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-white-text mb-6">Álbuns</h3>
        <InfiniteScrollList
          items={allAlbums}
          renderItem={renderAlbumItem}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          emptyComponent={
            <div className="text-center py-12 text-gray-400 col-span-full">
              Nenhum álbum encontrado.
            </div>
          }
        />
      </div>
    </div>
  );
};

export default ArtistaDetalhes;

