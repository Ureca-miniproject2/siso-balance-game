import { useState } from 'react';
import Comment from '../comments/comment/Comment';

export default function Comments(props) {
  const { bestComments, bestButtonColor } = props;
  const [isHeart, setIsHeart] = useState(false);
  console.log(bestComments);
  return (
    <>
      {bestComments?.map((comment) => (
        <Comment
          key={comment.comment_id}
          isBest={true}
          isTrash={true}
          isHeart={isHeart}
          setIsHeart={setIsHeart}
          bestButtonColor={bestButtonColor}
          id={comment.comment_id}
          nickname={comment.user.username}
          time={comment.created_at}
          like={comment.likeCount}
          comment={comment.comment_text}
        />
      ))}
    </>
  );
}
