import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTrackToPlaylist } from '../api/queries/add-to-playlist';
import { useAuth } from '../providers/auth-provider';

export const useAddToPlaylist = () => {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ playlistId, trackUri }: { playlistId: string; trackUri: string }) => {
      if (!accessToken) {
        throw new Error('No access token available');
      }
      return addTrackToPlaylist(playlistId, trackUri, accessToken);
    },
    onSuccess: (_, variables) => {
      // Invalidate playlist tracks to refresh the list
      queryClient.invalidateQueries({
        queryKey: ['playlistTracks', variables.playlistId]
      });
      
      // Música adicionada com sucesso
    },
    onError: (error: any) => {
      console.error('❌ Erro ao adicionar música à playlist:', error);
      
      if (error.response?.status === 403) {
        console.error('❌ Você não tem permissão para modificar esta playlist');
      }
    },
  });
};