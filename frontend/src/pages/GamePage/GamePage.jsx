import { useParams } from 'react-router-dom';
import Choice from '../../components/choice/Choice';
import CommentInput from '../../components/commentInput/CommentInput.jsx';
import Comments from '../../components/comments/Comments';
import useGetGameItems from '../../hooks/queries/useGetGameItems';
import * as S from './GamePage.styled';
import useGetBestComments from '../../hooks/queries/useGetBestComments.js';

export default function GamePage() {
  const { id } = useParams();
  const { data } = useGetGameItems(id);
  const { data: firstItemBestComments } = useGetBestComments(data?.firstItem.item_id);
  const { data: secondItemBestComments } = useGetBestComments(data?.secondItem.item_id);
  return (
    <>
      <Choice game={data} />
      <S.Container>
        <S.SmallContainer>
          <Comments bestComments={firstItemBestComments} />
          <CommentInput />
        </S.SmallContainer>
        <S.SmallContainer>
          <Comments bestComments={secondItemBestComments} bestButtonColor={true} />
          <CommentInput />
        </S.SmallContainer>
      </S.Container>
    </>
  );
}
