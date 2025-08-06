import { useQuery } from '@tanstack/react-query';
import { fetchTopArtists } from '../api/queries/top-artists';
import { useAuth } from '../providers/auth-provider';

export const useTopArtists = () => {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: ['topArtists'],
    queryFn: () => fetchTopArtists(accessToken!),
    enabled: !!accessToken,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};