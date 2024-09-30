import { useInfiniteQuery } from '@tanstack/react-query';
import getMyGames from '../../apis/getMyGames';
import QUERY_KEYS from '../../constants/queryKeys';

const useGetMyGames = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_MY_GAMES],
    queryFn: async ({ pageParam = 0 }) => {
      const data = await getMyGames(pageParam, 10);
      return data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const total = lastPage.total; // now we have total here
      const loadedGames = allPages.flatMap((page) => page.data).length;
      return loadedGames < total ? allPages.length : undefined;
    },
  });
};

export default useGetMyGames;
