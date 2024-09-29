import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteLike from '../../apis/deleteLike';
import QUERY_KEYS from '../../constants/queryKeys';
import postLike from '../../apis/postLike';
import { toast } from 'react-toastify';

export default function useCommentLike(commentId, itemId) {
  const queryClient = useQueryClient();

  const itemIdNumber = parseInt(itemId);
  return useMutation({
    mutationFn: async ({ isHeart }) => {
      if (!isHeart) {
        const response = await postLike(commentId);
        return response;
      }
      const response = await deleteLike(commentId);
      return response;
    },
    onMutate: async () => {
      await queryClient.cancelQueries([QUERY_KEYS.COMMENTS, { itemId: itemIdNumber }]);
      const previousData = queryClient.getQueryData([
        QUERY_KEYS.COMMENTS,
        { itemId: itemIdNumber },
      ]);

      queryClient.setQueryData([QUERY_KEYS.COMMENTS, { itemId: itemIdNumber }], (old) => {
        const newPages = old.pages.map((page) => {
          const newComment = page.data.map((comment) => {
            if (comment.comment_id === commentId) {
              const isLiked = !comment.isLikedByUser;
              return {
                ...comment,
                isLikedByUser: isLiked,
                likeCount: isLiked ? comment.likeCount + 1 : comment.likeCount - 1,
              };
            }
            return comment;
          });
          const newPage = { ...page, data: newComment };
          return newPage;
        });
        return { ...old, pages: newPages };
      });
      return { previousData };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        [QUERY_KEYS.COMMENTS, { itemId: itemIdNumber }],
        context.previousData,
      );
      toast.error('다시 시도해주세요.');
    },

    onSettled: () => {
      queryClient.invalidateQueries([QUERY_KEYS.BEST_COMMENTS, { itemId: itemIdNumber }]);
    },
  });
}
