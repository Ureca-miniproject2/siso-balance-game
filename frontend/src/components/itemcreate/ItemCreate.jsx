import React, { useEffect, useRef } from 'react';
import * as S from './ItemCreate.styled';
import { useState } from 'react';

export default function ItemCreate() {
  const [text, setText] = useState('');

  // 엔터키 입력 방지 핸들러
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // 기본 동작(줄바꿈) 방지
    }
  };

  const handleChange = (event) => {
    setText(event.target.value); // 상태 업데이트
  };

  const textarea1Ref = useRef(null);
  const textarea2Ref = useRef(null);
  const handleInput = (event, textareaRef) => {
    setText(event.target.value); // 상태 업데이트

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };
  // useEffect(() => {
  //   const textarea = textareaRef.current;
  //   if (textarea) {
  //     textarea.addEventListener('input', handleInput);
  //   }
  //   return () => {
  //     if (textarea) {
  //       textarea.removeEventListener('input', handleInput);
  //     }
  //   };
  // }, []);

  return (
    <>
      <S.ItemContainer>
        <S.ItemList>
          <S.TextBox
            ref={textarea1Ref}
            maxLength={60}
            type="text"
            onChange={(e) => handleInput(e, textarea1Ref)}
            onKeyDown={handleKeyDown}
            placeholder="입력하세요"
            rows={1}
          />
        </S.ItemList>
        <S.ItemList2>
          <S.TextBox
            ref={textarea2Ref}
            maxLength={60}
            type="text"
            onChange={(e) => handleInput(e, textarea2Ref)}
            onKeyDown={handleKeyDown}
            placeholder="입력하세요"
            rows={1}
          />
        </S.ItemList2>
      </S.ItemContainer>
      <S.ButtonContainer>
        <S.Button>등록하기</S.Button>
      </S.ButtonContainer>
    </>
  );
}
