import { useEffect, useState } from 'react';
import * as S from './Item.styled';

export default function Item() {
  const [e, setE] = useState([]);
  useEffect(() => {
    const a = async () => {
      const res = await fetch('http://localhost:5173/api/item');
      const data = await res.json();
      console.log(data.data);
      setE(data.data);
    };
    a();
  }, []);

  return (
    <S.ItemContainer>
      {e.map((item) => {
        return (
          <div key={item.id}>
            <S.ItemList>{item.firstTitle}</S.ItemList>
            <S.ItemList2>{item.secondTitle}</S.ItemList2>
          </div>
        );
      })}
    </S.ItemContainer>
  );
}
