
import { useNavigate } from 'react-router-dom';

import Album from '../../components/Album';
import { PageHeader } from '../../components/layout/PageHeader';
import { PageWithQueryState } from '../../components/PageWithQueryState';
import { useTopArtists } from '../../hooks/useTopArtists';

const Artistas = () => {
  const navigate = useNavigate();
  const { data: topArtists, isLoading, error } = useTopArtists();

  const handleArtistClick = (artistId: string) => {
    navigate(`/artista/${artistId}`);
  };

  if (isLoading || error) {
    <PageWithQueryState
    isLoading={isLoading}
    error={error}
    loadingMessage="Carregando artistas..."
    errorMessage="Erro ao carregar artistas. Tente novamente."
    headerContent={<PageHeader
      title="Top Artistas"
      subtitle="Aqui você encontra seus artistas preferidos"
    />}
  />
}

  const artists = topArtists?.items || [];

  return (
    <div className="p-6">
      <PageHeader
        title="Top Artistas"
        subtitle="Aqui você encontra seus artistas preferidos"
      />

      <div className="flex flex-col space-y-2">
        {artists.map((artist: any) => (
          <div
            key={artist.id}
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
        ))}
      </div>
    </div>
  );
};

export default Artistas;
