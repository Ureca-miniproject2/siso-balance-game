import MyGame from '../../components/mygame/MyGame';
import useGetMyGames from '../../hooks/queries/useGetMyGames';
import * as S from './MyGamePage.styled';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { useEffect, useRef } from 'react';
export default function GamePage() {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useGetMyGames();
  const loadMoreRef = useRef(null);
  const isIntersecting = useIntersectionObserver(loadMoreRef);
  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      <S.Container>
        {data?.pages.map((page) =>
          page.data.map(({ game_id, items }) => (
            <MyGame
              key={game_id}
              id={game_id}
              myGametext1={items[0]?.item_text}
              myGametext2={items[1]?.item_text}
            />
          )),
        )}
      </S.Container>
      <S.ObserverDiv ref={loadMoreRef} style={{ height: '20px' }} />
    </>
  );
}
