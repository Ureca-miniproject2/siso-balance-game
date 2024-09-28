import { useQuery } from '@tanstack/react-query';
import QUERY_KEYS from '../../constants/queryKeys';
import getBestComments from '../../apis/getBestComments';

export default function useGetBestComments(itemId) {
  return useQuery({
    queryKey: [QUERY_KEYS.BEST_COMMENTS, itemId],
    queryFn: async () => {
      const data = await getBestComments(itemId);
      return data;
    },
    enabled: !!itemId,
  });
}
