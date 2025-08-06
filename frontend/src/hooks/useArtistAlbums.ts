import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchArtistAlbums } from '../api/queries/artist-albums';
import { useAuth } from '../providers/auth-provider';

export const useArtistAlbums = (artistId: string) => {
  const { accessToken } = useAuth();

  return useInfiniteQuery({
    queryKey: ['artistAlbums', artistId],
    queryFn: ({ pageParam = 0 }) => fetchArtistAlbums(artistId, accessToken!, 20, pageParam),
    enabled: !!accessToken && !!artistId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.next) {
        return allPages.length * 20; // offset for next page
      }
      return undefined;
    },
    initialPageParam: 0,
  });
};