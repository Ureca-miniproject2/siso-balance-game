import * as S from './Choice.styled';

export default function Choice(props) {
  const { game } = props;
  console.log(game);
  return (
    <S.ItemContainer>
      <S.ItemList>{game?.firstItem.item_text}</S.ItemList>
      <S.ItemList2>{game?.secondItem.item_text}</S.ItemList2>
    </S.ItemContainer>
  );
}
