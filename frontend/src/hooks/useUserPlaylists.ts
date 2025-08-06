import { useQuery } from '@tanstack/react-query';
import { fetchUserPlaylists } from '../api/queries/user-playlists';
import { useAuth } from '../providers/auth-provider';

export const useUserPlaylists = () => {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: ['userPlaylists'],
    queryFn: () => fetchUserPlaylists(accessToken!),
    enabled: !!accessToken,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};