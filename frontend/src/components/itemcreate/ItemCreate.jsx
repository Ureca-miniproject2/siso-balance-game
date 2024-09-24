import React from 'react';
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

  return (
    <>
      <S.ItemContainer>
        <S.ItemList>
          <S.TextBox
            type="text"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="입력하세요"
          />
        </S.ItemList>
        <S.ItemList2>
          <S.TextBox
            type="text"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="입력하세요"
          />
        </S.ItemList2>
      </S.ItemContainer>
      <S.ButtonContainer>
        <S.Button>등록하기</S.Button>
      </S.ButtonContainer>
    </>
  );
}
