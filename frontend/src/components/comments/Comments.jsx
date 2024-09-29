import { useContext, useEffect, useRef } from 'react';
import Comment from '../comments/comment/Comment';
import useGetBestComments from '../../hooks/queries/useGetBestComments';
import useGetComments from '../../hooks/queries/useGetComments';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import * as S from './Comments.styled';
import { UserInfoContext } from '../../context/UserInfoContext';
export default function Comments(props) {
  const { bestButtonColor, itemId } = props;
  const { userInfo } = useContext(UserInfoContext);
  const { data: bestComments } = useGetBestComments(itemId);
  const {
    data: commentsPageData,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetComments(itemId);
  const loadMoreRef = useRef(null);
  const isIntersecting = useIntersectionObserver(loadMoreRef);
  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      {bestComments?.map((comment) => (
        <Comment
          key={comment.comment_id}
          isBest={true}
          isTrash={userInfo?.user_id === comment.user.user_id ? true : false}
          isHeart={comment.isLikedByUser}
          bestButtonColor={bestButtonColor}
          id={comment.comment_id}
          nickname={comment.user.username}
          time={comment.created_at}
          like={comment.likeCount}
          comment={comment.comment_text}
        />
      ))}
      {commentsPageData?.pages?.map((page) =>
        page.data.map((comment) => (
          <Comment
            key={comment.comment_id}
            isBest={false}
            isTrash={userInfo?.user_id === comment.user.user_id ? true : false}
            isHeart={comment.isLikedByUser}
            bestButtonColor={bestButtonColor}
            id={comment.comment_id}
            nickname={comment.user.username}
            time={comment.created_at}
            like={comment.likeCount}
            comment={comment.comment_text}
          />
        )),
      )}
      <S.ObserverDiv ref={loadMoreRef} />
    </>
  );
}
