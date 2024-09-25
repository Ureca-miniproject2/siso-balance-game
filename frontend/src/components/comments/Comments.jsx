import React from 'react';
import { useEffect, useState } from 'react';
// import HeartIcon from '../common/icon/HeartIcon';
import Comment from '../comments/comment/Comment';

export default function Comments() {
  const [comment, SetComment] = useState([]);
  const [comment2, setComment2] = useState([]);
  useEffect(() => {
    const a = async () => {
      const res = await fetch('http://localhost:5173/api/comments');
      const data = await res.json();
      console.log(data.data);
      SetComment(data.data);
    };

    const b = async () => {
      const res = await fetch('http://localhost:5173/api/comments');
      const data = await res.json();
      console.log(data.data);
      setComment2(data.data);
    };
    b();
    a();
  }, []);

  return (
    <>
      <Comment
        isBest={true}
        id="1"
        nickname="이지영"
        time="2분 전"
        like="13"
        comment="인싸를 만나서 나만 만나는 아싸로 만들겠어"
      />
    </>
  );
}
