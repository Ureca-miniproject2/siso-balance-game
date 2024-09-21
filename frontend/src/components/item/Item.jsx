import { useEffect, useState } from 'react';
import * as S from './Item.styled';
import { Link } from 'react-router-dom';

export default function Game() {
  const [games, setGames] = useState([]);
  useEffect(() => {
    const a = async () => {
      const res = await fetch('http://localhost:5173/api/item');
      const data = await res.json();
      console.log(data.data);
      setGames(data.data);
    };
    a();
  }, []);

  return (
    <S.ItemContainer>
      {games.map((game) => {
        return (
          <Link key={game.id} to={`/game/${game.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <S.ItemList>{game.firstTitle}</S.ItemList>
            <S.ItemList2>{game.secondTitle}</S.ItemList2>
          </Link>
        );
      })}
    </S.ItemContainer>
  );
}