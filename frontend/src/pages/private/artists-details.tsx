
import { useParams } from 'react-router-dom';

import Album from '../../components/Album';
import { BackButton } from '../../components/BackButton';
import { GridLayout } from '../../components/layout/GridLayout';
import { artistDetails } from '../../mock';

const ArtistaDetalhes = () => {
  const { artistId } = useParams();

  const artist = artistDetails[artistId as keyof typeof artistDetails];

  if (!artist) {
    return (
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-8">
          <BackButton to="/artistas" />
          <h1 className="text-2xl font-bold text-white-text">Artista não encontrado</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center space-x-4 mb-8">
        <BackButton to="/artistas" />
        <h1 className="text-2xl font-bold text-white-text">{artist.name}</h1>
      </div>

      <div className="flex items-center space-x-6 mb-8">
        <img
          src={artist.imageUrl}
          alt={artist.name}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h2 className="text-3xl font-bold text-white-text mb-2">{artist.name}</h2>
          <p className="text-gray-400">{artist.albums.length} álbuns</p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-white-text mb-6">Álbuns</h3>
        <GridLayout>
          {artist.albums.map((album, index) => (
            <Album
              key={index}
              name={album.name}
              imageUrl={album.imageUrl}
              size="md"
            />
          ))}
        </GridLayout>
      </div>
    </div>
  );
};

export default ArtistaDetalhes;
