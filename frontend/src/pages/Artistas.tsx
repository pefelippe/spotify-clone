
import { useNavigate } from 'react-router-dom';
import Album from '../components/Album';
import { PageHeader } from '../components/PageHeader';
import { artists } from '../mock';

const Artistas = () => {
  const navigate = useNavigate();

  const handleArtistClick = (artistId: string) => {
    navigate(`/artista/${artistId}`);
  };

  return (
    <div className="p-6">
      <PageHeader
        title="Top Artistas"
        subtitle="Aqui você encontra seus artistas preferidos"
      />

      <div className="flex flex-col space-y-6">
        {artists.map((artist) => (
          <div
            key={artist.id}
            onClick={() => handleArtistClick(artist.id)}
            className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
          >
            <Album
              name={artist.albumName}
              artistName={artist.name}
              imageUrl={artist.imageUrl}
              size="md"
            />
            <div className="flex-1">
              <h3 className="text-white-text font-semibold text-lg">
                {artist.name}
              </h3>
              <p className="text-gray-400 text-sm">
                {artist.albumName}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artistas;
