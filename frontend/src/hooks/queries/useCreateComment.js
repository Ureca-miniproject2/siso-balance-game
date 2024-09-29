import { useMutation, useQueryClient } from '@tanstack/react-query';
import createComment from '../../apis/createComment';
import { toast } from 'react-toastify';
import QUERY_KEYS from '../../constants/queryKeys';

export default function useCreateComment(itemId) {
  const queryClient = useQueryClient();
  const itemIdNumber = parseInt(itemId);
  return useMutation({
    mutationFn: async ({ comment_text }) => {
      const response = await createComment(comment_text, itemId);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.COMMENTS, { itemId: itemIdNumber }]);
      toast.success('댓글이 성공적으로 등록되었습니다.');
    },
    onError: () => {
      toast.error('댓글 등록에 실패했습니다.');
    },
  });
}
