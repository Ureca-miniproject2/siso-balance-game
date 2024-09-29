import { useEffect, useRef } from 'react';
import Comment from '../comments/comment/Comment';
import useGetBestComments from '../../hooks/queries/useGetBestComments';
import useGetComments from '../../hooks/queries/useGetComments';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import * as S from './Comments.styled';
export default function Comments(props) {
  const { bestButtonColor, itemId } = props;
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
          isTrash={true}
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
            isTrash={false}
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
