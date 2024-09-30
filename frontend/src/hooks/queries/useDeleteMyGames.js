import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import QUERY_KEYS from '../../constants/queryKeys';
import deleteMyGames from '../../apis/deleteMyGames';

const useDeleteMyGames = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERY_KEYS.DELETE_MY_GAMES],
    mutationFn: async (page, limit, gameId) => {
      const data = await deleteMyGames(page, limit, gameId);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.GET_MY_GAMES]);
      toast.success('게임이 삭제되었습니다.');
    },
    onError: () => {
      toast.error('게임 삭제를 실패했습니다.');
    },
  });
};

export default useDeleteMyGames;
