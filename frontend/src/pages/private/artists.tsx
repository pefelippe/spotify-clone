
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

import Album from '../../components/Album';
import { PageHeader } from '../../components/layout/PageHeader';
import { PageWithQueryState } from '../../components/PageWithQueryState';
import { InfiniteScrollList } from '../../components/InfiniteScrollList';
import { useTopArtists } from '../../hooks/useTopArtists';

const Artistas = () => {
  const navigate = useNavigate();
  const { 
    data, 
    isLoading, 
    error, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useTopArtists();

  const handleArtistClick = (artistId: string) => {
    navigate(`/artista/${artistId}`);
  };

  const pageHeader = (
    <PageHeader
      title="Top Artistas"
      subtitle="Aqui você encontra seus artistas preferidos"
    />
  );

  if (isLoading || error) {
    return (
      <PageWithQueryState
        isLoading={isLoading}
        error={error}
        loadingMessage="Carregando artistas..."
        errorMessage="Erro ao carregar artistas. Tente novamente."
        headerContent={pageHeader}
      />
    );
  }

  const allArtists = useMemo(() => {
    return data?.pages.flatMap(page => page.items) || [];
  }, [data]);

  const renderArtistItem = (artist: any) => (
    <div
      onClick={() => handleArtistClick(artist.id)}
      className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
    >
      <Album
        name={artist.name}
        imageUrl={artist.images?.[0]?.url || ''}
        size="xs"
      />
      <div className="flex-1">
        <h3 className="text-white-text font-semibold text-lg">
          {artist.name}
        </h3>
        <p className="text-gray-400 text-sm">
          {artist.followers?.total ? `${artist.followers.total.toLocaleString()} seguidores` : 'Artista'}
        </p>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      {pageHeader}

      <InfiniteScrollList
        items={allArtists}
        renderItem={renderArtistItem}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        className="flex flex-col space-y-2"
        emptyComponent={
          <div className="text-center py-12 text-gray-400">
            Nenhum artista encontrado.
          </div>
        }
      />
    </div>
  );
};

export default Artistas;
