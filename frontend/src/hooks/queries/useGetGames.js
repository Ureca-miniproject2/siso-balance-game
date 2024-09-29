import { useInfiniteQuery } from '@tanstack/react-query';
import getGames from '../../apis/getGames';
import QUERY_KEYS from '../../constants/queryKeys';

export default function useGetGames() {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GAMES],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getGames(pageParam, 10);
      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const total = lastPage.total; // now we have total here
      const loadedGames = allPages.flatMap((page) => page.data).length;

      return loadedGames < total ? allPages.length : undefined;
    },
  });
}
