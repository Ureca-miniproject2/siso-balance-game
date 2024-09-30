import { useMutation, useQueryClient } from '@tanstack/react-query';
import selectItem from '../../apis/selectItem';
import QUERY_KEYS from '../../constants/queryKeys';
import { toast } from 'react-toastify';

export default function useSelectItem(gameId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemId) => {
      const response = await selectItem(gameId, itemId);
      return response;
    },
    onMutate: async (itemId) => {
      await queryClient.cancelQueries([QUERY_KEYS.GAMES_ITEMS]);

      const previousData = queryClient.getQueryData([QUERY_KEYS.GAMES_ITEMS]);

      queryClient.setQueryData([QUERY_KEYS.GAMES_ITEMS], (oldData) => {
        if (!oldData) return oldData;

        const firstItemSelected = oldData.firstItem.item_id === itemId;
        const secondItemSelected = oldData.secondItem.item_id === itemId;

        // 이미 선택된 아이템을 다시 눌러서 선택을 취소하는 경우
        if (firstItemSelected && oldData.firstItem.isSelected) {
          return {
            ...oldData,
            firstItem: {
              ...oldData.firstItem,
              isSelected: false,
              selected_count: oldData.firstItem.selected_count - 1,
            },
          };
        }

        if (secondItemSelected && oldData.secondItem.isSelected) {
          return {
            ...oldData,
            secondItem: {
              ...oldData.secondItem,
              isSelected: false,
              selected_count: oldData.secondItem.selected_count - 1,
            },
          };
        }

        // 반대쪽 아이템을 선택했을 때 기존 선택한 아이템의 선택 해제 및 카운트 감소
        if (firstItemSelected && !oldData.firstItem.isSelected) {
          return {
            ...oldData,
            firstItem: {
              ...oldData.firstItem,
              isSelected: true,
              selected_count: oldData.firstItem.selected_count + 1,
            },
            secondItem: oldData.secondItem.isSelected
              ? {
                  ...oldData.secondItem,
                  isSelected: false,
                  selected_count: oldData.secondItem.selected_count - 1,
                }
              : oldData.secondItem,
          };
        }

        if (secondItemSelected && !oldData.secondItem.isSelected) {
          return {
            ...oldData,
            secondItem: {
              ...oldData.secondItem,
              isSelected: true,
              selected_count: oldData.secondItem.selected_count + 1,
            },
            firstItem: oldData.firstItem.isSelected
              ? {
                  ...oldData.firstItem,
                  isSelected: false,
                  selected_count: oldData.firstItem.selected_count - 1,
                }
              : oldData.firstItem,
          };
        }

        return oldData;
      });

      return { previousData };
    },

    onError: (err, variables, context) => {
      console.log(err);
      toast.error('다시 시도해주세요.');
      queryClient.setQueryData([QUERY_KEYS.GAMES_ITEMS], context.previousData);
    },
  });
}
