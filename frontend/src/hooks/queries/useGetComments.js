import { useInfiniteQuery } from '@tanstack/react-query';
import QUERY_KEYS from '../../constants/queryKeys';
import getComments from '../../apis/getComments';

export default function useGetComments(itemId) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.COMMENTS, { itemId }],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getComments(itemId, pageParam, 10);
      return response;
    },
    enabled: !!itemId,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const total = lastPage.total;

      const loadedComments = allPages.flatMap((page) => page.data).length;

      return loadedComments < total ? allPages.length : undefined;
    },
  });
}
