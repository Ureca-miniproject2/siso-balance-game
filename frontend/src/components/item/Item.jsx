import * as S from './Item.styled';
import { Link } from 'react-router-dom';
import useGetGames from '../../hooks/queries/useGetGames';

export default function Game() {
  const { data: games } = useGetGames();

  return (
    <S.ItemContainer>
      {games?.map((game) => {
        return (
          <Link
            key={game.game_id}
            to={`/game/${game.game_id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <S.ItemList>{game.items[0].item_text}</S.ItemList>
            <S.ItemList2>{game.items[1].item_text}</S.ItemList2>
          </Link>
        );
      })}
    </S.ItemContainer>
  );
}
