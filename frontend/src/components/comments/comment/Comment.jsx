import * as S from './Comment.styled';
import TrashIconImg from '../../common/icon/TrashIcon';
import HeartIconImg from '../../common/icon/HeartIcon';
import timeAgo from '../../../utils/timeAgo';
import useBestCommentLike from '../../../hooks/queries/useBestCommentLike';
import useCommentLike from '../../../hooks/queries/useCommentLike';

export default function Comment(props) {
  const { mutate: bestCommentLikeMutate } = useBestCommentLike(props.commentId, props.itemId);
  const { mutate: commentLikeMutate } = useCommentLike(props.commentId, props.itemId);
  const handleClick = () => {
    if (props.isBest) {
      bestCommentLikeMutate({ isHeart: props.isHeart });
      return;
    } else {
      commentLikeMutate({ isHeart: props.isHeart });
      return;
    }
  };

  // const handleLike = () => {
  //   if (isHeart) {
  //     //좋아요 취소
  //     return;
  //   }
  //   //좋아요
  // };

  return (
    <S.CommentContainer isBest={props.isBest}>
      <S.TopContainer key={props.id}>
        <S.BestButton isBest={props.isBest} bestButtonColor={props.bestButtonColor}>
          BEST
        </S.BestButton>
        <S.NickNameStyle>{props.nickname}</S.NickNameStyle>
        <S.TimeStyle>{timeAgo(new Date(props.time))}</S.TimeStyle>
        <S.TrashIcon isTrash={props.isTrash}>
          <TrashIconImg />
        </S.TrashIcon>
        <S.LikeContainer>
          <S.HeartIcon onClick={handleClick} isHeart={props.isHeart}>
            <HeartIconImg />
          </S.HeartIcon>
          <S.LikeStyle>{props.like}</S.LikeStyle>
        </S.LikeContainer>
      </S.TopContainer>
      <S.CommentStyle>{props.comment}</S.CommentStyle>
    </S.CommentContainer>
  );
}
