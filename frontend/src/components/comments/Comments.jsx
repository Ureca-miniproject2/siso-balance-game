import React from 'react';
import * as S from './Comments.styled';
import { useEffect, useState } from 'react';
import timeAgo from '../../utils/timeAgo';
import HeartIcon from '../common/icon/HeartIcon';


export default function Comments() {
    const [comment, SetComment] = useState([]);
    useEffect(() => {
        const a = async () => {
            const res = await fetch('http://localhost:5173/api/comments');
            const data = await res.json();
            console.log(data.data);
            SetComment(data.data);
        };
        a();
    }, []);

    return (
        <div>
            {comment.map((comments) => {
                console.log(comments.nickname);

                return (
                    <S.Container>
                    <S.CommentContainer>
                        <S.TopContainer key={comments.id}>
                            <S.NickNameStyle>{comments.nickname}</S.NickNameStyle>
                            <S.TimeStyle>{comments.time}</S.TimeStyle>
                            <S.LikeContainer><S.HeartIcon><HeartIcon /></S.HeartIcon><S.LikeStyle>{comments.like}</S.LikeStyle></S.LikeContainer>
                        </S.TopContainer>
                        <S.CommentStyle>{comments.comment}</S.CommentStyle>
                    </S.CommentContainer>

                    <S.CommentContainer2>
                        <S.TopContainer key={comments.id}>
                            <S.NickNameStyle>{comments.nickname}</S.NickNameStyle>
                            <S.TimeStyle>{comments.time}</S.TimeStyle>
                            <S.LikeContainer><S.HeartIcon><HeartIcon /></S.HeartIcon><S.LikeStyle>{comments.like}</S.LikeStyle></S.LikeContainer>
                        </S.TopContainer>
                        <S.CommentStyle>{comments.comment}</S.CommentStyle>
                    </S.CommentContainer2>
                    </S.Container>
                );
            })}
            {/* {timeAgo(props.createdAt)} */}
        </div>
    );
};

