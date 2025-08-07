import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchLikedSongs } from '../api/queries/liked-songs';
import { useAuth } from '../providers/auth-provider';

export const useLikedSongs = () => {
  const { accessToken } = useAuth();

  return useInfiniteQuery({
    queryKey: ['likedSongs'],
    queryFn: ({ pageParam = 0 }) => fetchLikedSongs(accessToken!, 20, pageParam),
    enabled: !!accessToken,
    staleTime: 5 * 60 * 1000, // 5 minutes
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