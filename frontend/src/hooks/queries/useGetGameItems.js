import { useQuery } from '@tanstack/react-query';
import getGameItems from '../../apis/getGameItems';
import QUERY_KEYS from '../../constants/queryKeys';

const useGetGameItems = (gameId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GAMES_ITEMS],
    queryFn: async () => {
      const j = await getGameItems(gameId);
      return j;
    },
  });
};

export default useGetGameItems;
