import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteComment from '../../apis/deleteComment';
import QUERY_KEYS from '../../constants/queryKeys';
import { toast } from 'react-toastify';

export default function useDeleteComment(commentId, itemId) {
  const queryClient = useQueryClient();
  const itemIdNumber = parseInt(itemId);
  return useMutation({
    mutationFn: async () => {
      return await deleteComment(commentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.COMMENTS, { itemId: itemIdNumber }]);
      queryClient.invalidateQueries([QUERY_KEYS.BEST_COMMENTS, { itemId: itemIdNumber }]);
      toast.success('댓글이 삭제되었습니다.');
    },
    onError: () => {
      toast.error('댓글 삭제에 실패했습니다.');
    },
  });
}
