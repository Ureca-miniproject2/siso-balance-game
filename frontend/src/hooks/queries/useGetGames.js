import { useQuery } from '@tanstack/react-query';
import React from 'react';
import getGames from '../../apis/getGames';
import QUERY_KEYS from '../../constants/queryKeys';

export default function useGetGames() {
  return useQuery({
    queryKey: [QUERY_KEYS.GAMES],
    queryFn: async () => {
      const { data } = await getGames(1, 10);
      return data;
    },
  });
}
