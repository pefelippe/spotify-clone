import { useQuery } from '@tanstack/react-query';
import { fetchArtistAlbums } from '../api/queries/artist-albums';
import { useAuth } from '../providers/auth-provider';

export const useArtistAlbums = (artistId: string) => {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: ['artistAlbums', artistId],
    queryFn: () => fetchArtistAlbums(artistId, accessToken!),
    enabled: !!accessToken && !!artistId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
};