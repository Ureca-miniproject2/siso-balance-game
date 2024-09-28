import { useParams } from 'react-router-dom';
import Choice from '../../components/choice/Choice';
import CommentInput from '../../components/commentInput/CommentInput.jsx';
import Comments from '../../components/comments/Comments';
import useGetGameItems from '../../hooks/queries/useGetGameItems';
import * as S from './GamePage.styled';

export default function GamePage() {
  const { id } = useParams();

  const { data } = useGetGameItems(id);
  return (
    <>
      <Choice game={data} />
      <S.Container>
        <S.SmallContainer>
          <Comments />
          <CommentInput />
        </S.SmallContainer>
        <S.SmallContainer>
          <Comments />
          <CommentInput />
        </S.SmallContainer>
      </S.Container>
    </>
  );
}
