import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchUserDetails } from '../api/queries/user-details';
import { useAuth } from '../providers/auth-provider';

export const useUserDetails = () => {
  const { accessToken } = useAuth();

  return useInfiniteQuery({
    queryKey: ['userDetails'],
    queryFn: ({ pageParam = 0 }) => fetchUserDetails(accessToken!, 20, pageParam),
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

export const useUserPublicPlaylists = (userId: string) => {
  const { accessToken } = useAuth();

  return useInfiniteQuery({
    queryKey: ['userPlaylists', userId],
    queryFn: ({ pageParam = 0 }) => fetchUserPlaylists(userId, accessToken!, 20, pageParam),
    enabled: !!accessToken && !!userId,
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
