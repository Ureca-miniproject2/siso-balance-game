import * as S from './Comment.styled';
import TrashIconImg from '../../common/icon/TrashIcon';
import HeartIconImg from '../../common/icon/HeartIcon';
import timeAgo from '../../../utils/timeAgo';

export default function Comment(props) {
  const handleClick = () => {
    props.setIsHeart(!props.isHeart); //하트 컬러 변경 함수 호출
  };

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
