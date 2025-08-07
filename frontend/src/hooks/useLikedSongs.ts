import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchLikedSongs, addToLikedSongs, removeFromLikedSongs } from '../api/queries/liked-songs';
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
    retry: (failureCount, error: any) => {
      // Não tentar novamente para erros 403 (sem permissão)
      if (error?.response?.status === 403) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

export const useAddToLikedSongs = () => {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (trackIds: string[]) => addToLikedSongs(accessToken!, trackIds),
    onSuccess: () => {
      // Invalidar e refazer a query de liked songs
      queryClient.invalidateQueries({ queryKey: ['likedSongs'] });
    },
    onError: (error: any) => {
      console.error('❌ Erro ao adicionar músicas aos favoritos:', error);
    },
  });
};

export const useRemoveFromLikedSongs = () => {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (trackIds: string[]) => removeFromLikedSongs(accessToken!, trackIds),
    onSuccess: () => {
      // Invalidar e refazer a query de liked songs
      queryClient.invalidateQueries({ queryKey: ['likedSongs'] });
    },
    onError: (error: any) => {
      console.error('❌ Erro ao remover músicas dos favoritos:', error);
    },
  });
};