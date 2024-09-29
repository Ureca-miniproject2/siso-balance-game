import * as S from './Items.styled';
import { Link } from 'react-router-dom';
import useGetGames from '../../hooks/queries/useGetGames';
import { useEffect, useRef } from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

export default function Items() {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useGetGames();
  const loadMoreRef = useRef(null);
  const isIntersecting = useIntersectionObserver(loadMoreRef);
  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      <S.ItemContainer>
        {data?.pages?.map((page) =>
          page.data.map(
            (
              { game_id, items }, // page에서 data 배열을 추출하여 매핑
            ) => (
              <Link
                key={game_id}
                to={`/game/${game_id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <S.ItemList>{items[0]?.item_text}</S.ItemList>
                <S.ItemList2>{items[1]?.item_text}</S.ItemList2>
              </Link>
            ),
          ),
        )}
      </S.ItemContainer>
      <S.ObserverDiv ref={loadMoreRef} style={{ height: '20px' }} />
    </>
  );
}
