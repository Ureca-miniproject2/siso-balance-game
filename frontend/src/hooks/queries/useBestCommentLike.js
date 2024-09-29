import { useMutation, useQueryClient } from '@tanstack/react-query';
import postLike from '../../apis/postLike';
import QUERY_KEYS from '../../constants/queryKeys';
import deleteLike from '../../apis/deleteLike';

export default function useBestCommentLike(commentId, itemId) {
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
      await queryClient.cancelQueries([QUERY_KEYS.BEST_COMMENTS, { itemId: itemIdNumber }]);
      const previousData = queryClient.getQueryData([
        QUERY_KEYS.BEST_COMMENTS,
        { itemId: itemIdNumber },
      ]);

      queryClient.setQueryData([QUERY_KEYS.BEST_COMMENTS, { itemId: itemIdNumber }], (old) => {
        return old.map((comment) => {
          if (comment.comment_id === commentId) {
            return {
              ...comment,
              isLikedByUser: !comment.isLikedByUser,
              likeCount: comment.isLikedByUser ? comment.likeCount - 1 : comment.likeCount + 1,
            };
          }
          return comment;
        });
      });

      return { previousData };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        [QUERY_KEYS.BEST_COMMENTS, { itemId: itemIdNumber }],
        context.previousData,
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries([QUERY_KEYS.COMMENTS, { itemId: itemIdNumber }]);
    },
  });
}
