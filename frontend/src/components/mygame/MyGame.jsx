import DeleteIcon from '../common/icon/DeleteIcon';
import * as S from './MyGame.styled';

export default function MyGame() {
  return (
    <>
      <S.ItemContainer>
        <S.ItemListContainer>
          <S.DeleteButton>
            <DeleteIcon />
          </S.DeleteButton>
          <S.ItemList>하이하이</S.ItemList>
          <S.ItemList2>하이하이</S.ItemList2>
        </S.ItemListContainer>
        <S.ItemListContainer>
          <S.DeleteButton>
            <DeleteIcon />
          </S.DeleteButton>
          <S.ItemList>하이하이</S.ItemList>
          <S.ItemList2>하이하이</S.ItemList2>
        </S.ItemListContainer>
        <S.ItemListContainer>
          <S.DeleteButton>
            <DeleteIcon />
          </S.DeleteButton>
          <S.ItemList>하이하이</S.ItemList>
          <S.ItemList2>하이하이</S.ItemList2>
        </S.ItemListContainer>
      </S.ItemContainer>
    </>
  );
}
