import React from 'react';
import * as S from './CommentInput.styled';
import ArrowIcon from '../common/icon/ArrowIcon';
import { useState } from 'react';

export default function CommentInput() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <S.InputContainer>
        <S.TextInput value={inputValue} onChange={handleInputChange} />
        <S.ButtonClick isActive={!!inputValue}>
          <ArrowIcon />
        </S.ButtonClick>
      </S.InputContainer>
    </>
  );
}
