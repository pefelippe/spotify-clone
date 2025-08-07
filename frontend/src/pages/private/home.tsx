import { useNavigate } from 'react-router-dom';
import { useTopArtists } from '../../hooks/useTopArtists';
import { useUserPlaylists } from '../../hooks/useUserPlaylists';
import { useLikedSongs } from '../../hooks/useLikedSongs';
import { usePlayer } from '../../providers/player-provider';
import Album from '../../components/Album';
import { QueryState } from '../../components/QueryState';
import { PlayIcon, HeartIcon } from '../../components/SpotifyIcons';

const Home = () => {
  const navigate = useNavigate();
  const { data: topArtistsData, isLoading: isLoadingArtists, error: artistsError } = useTopArtists();
  const { data: playlistsData, isLoading: isLoadingPlaylists, error: playlistsError } = useUserPlaylists();
  const { data: likedSongsData, isLoading: isLoadingLikedSongs, error: likedSongsError } = useLikedSongs();
  const { playTrack, isReady, deviceId } = usePlayer();

  const topArtists = topArtistsData?.pages[0]?.items?.slice(0, 6) || [];
  const userPlaylists = playlistsData?.pages[0]?.items?.slice(0, 5) || []; // Reduzido para 5 para dar espaço para Liked Songs
  const likedSongsCount = likedSongsData?.pages[0]?.total || 0;



  const handleArtistClick = (artistId: string) => {
    navigate(`/artist/${artistId}`);
  };

  const handlePlaylistClick = (playlistId: string) => {
    navigate(`/playlist/${playlistId}`);
  };

  const handleLikedSongsClick = () => {
    // Navegar para a página de liked songs como playlist especial
    navigate('/playlists/liked-songs');
  };

  const handlePlaylistPlay = (playlistId: string) => {
    if (!isReady) {
      return;
    }
    
    if (!deviceId) {
      return;
    }
    
    const contextUri = `spotify:playlist:${playlistId}`;
    playTrack('', contextUri);
  };

  const handleArtistPlay = (artistId: string) => {
    if (!isReady) {
      return;
    }
    
    if (!deviceId) {
      return;
    }
    
    const contextUri = `spotify:artist:${artistId}`;
    playTrack('', contextUri);
  };

  const handleLikedSongsPlay = () => {
    if (!isReady) {
      return;
    }
    
    if (!deviceId) {
      return;
    }
    
    // Para liked songs, usamos o endpoint collection
    const contextUri = 'spotify:user:collection:tracks';
    playTrack('', contextUri);
  };


  // Quick access playlists (Liked Songs + primeiras 5 playlists em grid)
  const quickAccessPlaylists = userPlaylists.slice(0, 5);

  return (
    <div className="w-full p-6 space-y-8">
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {/* Liked Songs Card */}
          <div
            className="group flex items-center bg-gradient-to-r from-purple-700 to-blue-700 hover:from-purple-600 hover:to-blue-600 rounded-lg overflow-hidden cursor-pointer transition-all duration-200"
            onClick={handleLikedSongsClick}
          >
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-white flex items-center justify-center">
                <HeartIcon size={32} className="text-white" filled />
              </div>
              <div className="flex-1 px-4">
                <h3 className="text-white font-medium">Músicas Curtidas</h3>
                <p className="text-gray-200 text-sm">
                               {isLoadingLikedSongs ? 'Carregando...' : 
              likedSongsError?.response?.status === 403 ? 'Faça login novamente' : 
              likedSongsError ? 'Erro ao carregar' : 
              likedSongsCount > 0 ? `${likedSongsCount} músicas` : 'Nenhuma música curtida'}
                </p>
              </div>
              {!likedSongsError && likedSongsCount > 0 && (
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mr-4">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLikedSongsPlay();
                    }}
                    className="w-12 h-12 bg-green-spotify rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                  >
                    <PlayIcon size={16} className="text-black ml-0.5" />
                  </button>
                </div>
              )}
            </div>

          {/* User Playlists */}
          {quickAccessPlaylists.map((playlist: any) => (
            <div
              key={playlist.id}
              className="group flex items-center bg-gray-800/30 hover:bg-gray-700/50 rounded-lg overflow-hidden cursor-pointer transition-all duration-200"
              onClick={() => handlePlaylistClick(playlist.id)}
            >
              <img
                src={playlist.images?.[0]?.url || 'https://via.placeholder.com/80x80/333/fff?text=♪'}
                alt={playlist.name}
                className="w-20 h-20 object-cover"
              />
              <div className="flex-1 px-4">
                <h3 className="text-white font-medium truncate">{playlist.name}</h3>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mr-4">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlaylistPlay(playlist.id);
                  }}
                  className="w-12 h-12 bg-green-spotify rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                >
                  <PlayIcon size={16} className="text-black ml-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seus artistas favoritos */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Seus artistas favoritos</h2>
          <button 
            onClick={() => navigate('/artists')}
            className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
          >
            Mostrar todos
          </button>
        </div>

        <QueryState
          isLoading={isLoadingArtists}
          error={artistsError}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
            {topArtists.map((artist: any) => (
              <div
                key={artist.id}
                className="group flex flex-col items-center space-y-2 cursor-pointer transition-all duration-200 hover:bg-gray-800/50 p-2 rounded-lg"
                onClick={() => handleArtistClick(artist.id)}
              >
                <div className="relative">
                  <img
                    src={artist.images?.[0]?.url || 'https://via.placeholder.com/160x160/333/fff?text=♪'}
                    alt={artist.name}
                    className="w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover shadow-lg"
                  />
                                                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleArtistPlay(artist.id);
                                  }}
                                  className="w-12 h-12 bg-green-spotify rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
                                >
                                  <PlayIcon size={16} className="text-black ml-0.5" />
                                </button>
                              </div>
                </div>
                <div className="text-center">
                  <h3 className="text-white font-medium truncate w-full">{artist.name}</h3>
                  <p className="text-gray-400 text-sm">Artista</p>
                </div>
              </div>
            ))}
          </div>
        </QueryState>
      </section>

      {/* Suas playlists */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Feito para você</h2>
          <button 
            onClick={() => navigate('/playlists')}
            className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
          >
            Mostrar todos
          </button>
        </div>

        <QueryState
          isLoading={isLoadingPlaylists}
          error={playlistsError}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {userPlaylists.slice(6).map((playlist: any) => (
              <Album
                key={playlist.id}
                name={playlist.name}
                imageUrl={playlist.images?.[0]?.url}
                size="lg"
                onClick={() => handlePlaylistClick(playlist.id)}
                onPlay={() => handlePlaylistPlay(playlist.id)}
              />
            ))}
          </div>
        </QueryState>
      </section>

      {/* Recently Played - Placeholder for future implementation */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Tocado recentemente</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {/* Placeholder cards */}
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="bg-gray-800/30 p-4 rounded-lg">
              <div className="w-full aspect-square bg-gray-700/50 rounded-lg mb-4 flex items-center justify-center">
                <PlayIcon size={32} className="text-gray-500" />
              </div>
              <h3 className="text-white font-medium truncate">Em breve...</h3>
              <p className="text-gray-400 text-sm">Histórico de reprodução</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
