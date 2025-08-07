import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPlaylistDetails } from '../api/queries/playlist-details';
import { useAuth } from '../providers/auth-provider';

export const usePlaylistDetails = (playlistId: string) => {
  const { accessToken } = useAuth();

  return useInfiniteQuery({
    queryKey: ['playlistDetails', playlistId],
    queryFn: ({ pageParam = 0 }) => fetchPlaylistDetails(playlistId, accessToken!, 50, pageParam),
    enabled: !!accessToken && !!playlistId,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.next) {
        return allPages.length * 50;
      }
      return undefined;
    },
    initialPageParam: 0,
  });
};

export const usePlaylistTracks = (playlistId: string) => {
  const { accessToken } = useAuth();

  return useInfiniteQuery({
    queryKey: ['playlistTracks', playlistId],
    queryFn: ({ pageParam = 0 }) => fetchPlaylistTracks(playlistId, accessToken!, 50, pageParam),
    enabled: !!accessToken && !!playlistId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.next) {
        return allPages.length * 50; // offset for next page
      }
      return undefined;
    },
    initialPageParam: 0,
  });
};
