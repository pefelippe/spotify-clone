
import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useArtistDiscography, useArtistCollaborations, useArtistDetails, useArtistTopTracks } from '../../hooks/useArtistAlbums';
import { usePlayer } from '../../providers/player-provider';
import { ArtistAlbum } from '../../components/ArtistAlbum';
import { TrackList } from '../../components/TrackList';
import { PageTransition } from '../../components/PageTransition';
import { CenteredLayout } from '../../components/layout/CenteredLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { GridLayout } from '../../components/layout/GridLayout';

type DiscographyFilter = 'populares' | 'albuns' | 'singles' | 'eps';

const ArtistaDetalhes = () => {
  const { artistId } = useParams();
  const navigate = useNavigate();
  const { playTrack, deviceId, isReady } = usePlayer();
  const [discographyFilter, setDiscographyFilter] = useState<DiscographyFilter>('populares');
  
  const {
    data: discographyData,
    isLoading: isLoadingDiscography,
    error: discographyError,
    fetchNextPage: fetchNextDiscographyPage,
    hasNextPage: hasNextDiscographyPage,
    isFetchingNextPage: isFetchingNextDiscographyPage,
  } = useArtistDiscography(artistId!);

  const {
    data: collaborationsData,
    isLoading: isLoadingCollaborations,
    error: collaborationsError,
    fetchNextPage: fetchNextCollaborationsPage,
    hasNextPage: hasNextCollaborationsPage,
    isFetchingNextPage: isFetchingNextCollaborationsPage,
  } = useArtistCollaborations(artistId!);

  const {
    data: artistDetails,
    isLoading: isLoadingArtist,
    error: artistError,
  } = useArtistDetails(artistId!);

  const {
    data: topTracksData,
    isLoading: isLoadingTopTracks,
    error: topTracksError,
  } = useArtistTopTracks(artistId!);

  const allDiscography = useMemo(() => {
    return discographyData?.pages.flatMap(page =>
      page.items.filter((album: any) => album.album_type !== 'compilation'),
    ) || [];
  }, [discographyData]);

  const allCollaborations = useMemo(() => {
    return collaborationsData?.pages.flatMap(page =>
      page.items.filter((album: any) => album.album_type !== 'compilation'),
    ) || [];
  }, [collaborationsData]);

  const topTracks = useMemo(() => {
    return topTracksData?.tracks?.slice(0, 5) || [];
  }, [topTracksData]);

  const filteredDiscography = useMemo(() => {
    switch (discographyFilter) {
      case 'populares':
        return [...allDiscography].sort((a: any, b: any) =>
          new Date(b.release_date).getTime() - new Date(a.release_date).getTime(),
        ).slice(0, 20);
      case 'albuns':
        return allDiscography.filter((item: any) => item.album_type === 'album');
      case 'singles':
        return allDiscography.filter((item: any) =>
          item.album_type === 'single' && item.total_tracks === 1,
        );
      case 'eps':
        return allDiscography.filter((item: any) =>
          item.album_type === 'single' && item.total_tracks > 1,
        );
      default:
        return allDiscography;
    }
  }, [allDiscography, discographyFilter]);

  const artistName = artistDetails?.name || allDiscography[0]?.artists?.[0]?.name || 'Artista';

  const handleAlbumClick = (albumId: string) => {
    navigate(`/album/${albumId}`);
  };

  const handleAlbumPlay = (albumId: string, albumType: string) => {
    const contextUri = `spotify:album:${albumId}`;

    if (!isReady) {
      console.warn('⚠️ Player não está pronto ainda');
      return;
    }

    if (!deviceId) {
      console.warn('⚠️ Device ID não disponível');
      return;
    }

    playTrack('', contextUri);
  };

  if (isLoadingArtist && isLoadingDiscography) {
    return (
      <CenteredLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      </CenteredLayout>
    );
  }

  if (artistError || discographyError) {
    return (
      <CenteredLayout>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-2">Erro ao carregar artista</h2>
          <p className="text-gray-400">Tente novamente mais tarde.</p>
        </div>
      </CenteredLayout>
    );
  }

  const renderAlbumItem = (album: any) => (
    <ArtistAlbum
      key={album.id}
      album={album}
      onClick={() => handleAlbumClick(album.id)}
      onPlay={() => handleAlbumPlay(album.id, album.album_type)}
    />
  );

  return (
    <PageTransition>
      <CenteredLayout>
        <PageHeader title={artistName} showBackButton />
        
        <div className="space-y-8">
          {artistDetails && (
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center space-x-4">
                {artistDetails.images?.[0] && (
                  <img
                    src={artistDetails.images[0].url}
                    alt={artistDetails.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                )}
                <div>
                  <h1 className="text-2xl font-bold text-white">{artistDetails.name}</h1>
                  {artistDetails.genres && artistDetails.genres.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {artistDetails.genres.slice(0, 5).map((genre: string) => (
                        <span
                          key={genre}
                          className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {topTracks.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Músicas Populares</h2>
              <TrackList tracks={topTracks} />
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Discografia</h2>
              <div className="flex space-x-2">
                {(['populares', 'albuns', 'singles', 'eps'] as DiscographyFilter[]).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setDiscographyFilter(filter)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      discographyFilter === filter
                        ? 'bg-green-500 text-black'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {filter === 'populares' && 'Populares'}
                    {filter === 'albuns' && 'Álbuns'}
                    {filter === 'singles' && 'Singles'}
                    {filter === 'eps' && 'EPs'}
                  </button>
                ))}
              </div>
            </div>
            
            <GridLayout>
              {filteredDiscography.map(renderAlbumItem)}
            </GridLayout>
            
            {hasNextDiscographyPage && (
              <div className="text-center mt-6">
                <button
                  onClick={() => fetchNextDiscographyPage()}
                  disabled={isFetchingNextDiscographyPage}
                  className="px-6 py-2 bg-green-500 text-black font-medium rounded-full hover:bg-green-400 disabled:opacity-50"
                >
                  {isFetchingNextDiscographyPage ? 'Carregando...' : 'Carregar mais'}
                </button>
              </div>
            )}
          </div>

          {allCollaborations.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Colaborações</h2>
              <GridLayout>
                {allCollaborations.map(renderAlbumItem)}
              </GridLayout>
              
              {hasNextCollaborationsPage && (
                <div className="text-center mt-6">
                  <button
                    onClick={() => fetchNextCollaborationsPage()}
                    disabled={isFetchingNextCollaborationsPage}
                    className="px-6 py-2 bg-green-500 text-black font-medium rounded-full hover:bg-green-400 disabled:opacity-50"
                  >
                    {isFetchingNextCollaborationsPage ? 'Carregando...' : 'Carregar mais'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </CenteredLayout>
    </PageTransition>
  );
};

export default ArtistaDetalhes;

