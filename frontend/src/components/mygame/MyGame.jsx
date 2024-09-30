import DeleteIcon from '../common/icon/DeleteIcon';
import * as S from './MyGame.styled';
import deleteMyGames from '../../apis/deleteMyGames';
import useDeleteMyGames from '../../hooks/queries/useDeleteMyGames';

export default function MyGame({ id, myGametext1, myGametext2 }) {
  const { mutate: deleteGames } = useDeleteMyGames();

  const handleDelete = async () => {
    try {
      await deleteGames(id); // 삭제 요청 실행
    } catch (error) {
      console.error('게임 삭제 중 오류 발생:', error);
    }
  };

  return (
    <>
      <S.ItemContainer>
        <S.ItemListContainer>
          <S.DeleteButton onClick={() => handleDelete(id)}>
            <DeleteIcon />
          </S.DeleteButton>
          <S.ItemList>{myGametext1}</S.ItemList>
          <S.ItemList2>{myGametext2}</S.ItemList2>
        </S.ItemListContainer>
      </S.ItemContainer>
    </>
  );
}
