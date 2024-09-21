import React from 'react';
import * as S from './Comment.styled';
// import timeAgo from '../../utils/timeAgo';
import HeartIcon2 from '../../common/icon/HeartIcon';

export default function Comment(props) {
  return (
    <S.CommentContainer isBest={props.isBest}>
      <S.TopContainer key={props.id}>
        <S.BestButton isBest={props.isBest}>BEST</S.BestButton>
        <S.NickNameStyle>{props.nickname}</S.NickNameStyle>
        <S.TimeStyle>{props.time}</S.TimeStyle>
        <S.LikeContainer>
          <S.HeartIcon>
            <HeartIcon2 fill="#C8C8C8" />
          </S.HeartIcon>
          <S.LikeStyle>{props.like}</S.LikeStyle>
        </S.LikeContainer>
      </S.TopContainer>
      <S.CommentStyle>{props.comment}</S.CommentStyle>
    </S.CommentContainer>
  );
}
