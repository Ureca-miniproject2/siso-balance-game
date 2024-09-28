import { useQuery } from '@tanstack/react-query';
import React from 'react';
import getGames from '../../apis/getGames';
import QUERY_KEYS from '../../constants/queryKeys';

export default function useGetGames() {
  return useQuery({
    queryKey: [QUERY_KEYS.GAMES],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getGames(pageParam, 10);
      const { data, total } = response; // total을 여기서 추출
      return { data, total }; // total을 반환된 객체에 포함시킴
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const total = lastPage.total; // now we have total here
      const loadedGames = allPages.flatMap((page) => page.data).length; // 현재까지 로드된 게임 수

      // 로드된 게임 수가 전체 게임 수보다 적으면 다음 페이지 번호를 반환
      return loadedGames < total ? allPages.length : undefined;
    },
  });
}
