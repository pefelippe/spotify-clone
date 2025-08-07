import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchLikedSongs } from '../api/queries/liked-songs';
import { useAuth } from '../providers/auth-provider';

export const useLikedSongs = () => {
  const { accessToken } = useAuth();

  return useInfiniteQuery({
    queryKey: ['likedSongs'],
    queryFn: ({ pageParam = 0 }) => fetchLikedSongs(accessToken!, 20, pageParam),
    enabled: !!accessToken,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.next) {
        return allPages.length * 20;
      }
      return undefined;
    },
    initialPageParam: 0,
  });
};

export const useAddToLikedSongs = () => {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (trackIds: string[]) => addToLikedSongs(accessToken!, trackIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likedSongs'] });
    },
  });
};

export const useRemoveFromLikedSongs = () => {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (trackIds: string[]) => removeFromLikedSongs(accessToken!, trackIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likedSongs'] });
    },
  });
};
