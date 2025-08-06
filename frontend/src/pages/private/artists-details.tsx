
import { useParams } from 'react-router-dom';

import Album from '../../components/Album';
import { BackButton } from '../../components/BackButton';
import { GridLayout } from '../../components/layout/GridLayout';
import { QueryState } from '../../components/QueryState';
import { useArtistAlbums } from '../../hooks/useArtistAlbums';

const ArtistaDetalhes = () => {
  const { artistId } = useParams();
  const { data: artistAlbums, isLoading, error } = useArtistAlbums(artistId!);

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

  const albums = artistAlbums?.items || [];
  const artistName = albums[0]?.artists?.[0]?.name || 'Artista';

  return (
    <div className="p-6">
      <div className="flex items-center space-x-4 mb-8">
        <BackButton artistName={artistName} />
      </div>

      <div className="flex items-center space-x-6 mb-8">
        <img
          src={albums[0]?.images?.[0]?.url || ''}
          alt={artistName}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h2 className="text-3xl font-bold text-white-text mb-2">{artistName}</h2>
          <p className="text-gray-400">{albums.length} álbuns</p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-white-text mb-6">Álbuns</h3>
        <GridLayout>
          {albums.map((album: any) => (
            <Album
              key={album.id}
              name={album.name}
              imageUrl={album.images?.[0]?.url || ''}
              size="md"
            />
          ))}
        </GridLayout>
      </div>
    </div>
  );
};

export default ArtistaDetalhes;

