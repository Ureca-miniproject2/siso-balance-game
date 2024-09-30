import { useRef } from 'react';
import * as S from './ItemCreate.styled';
import useCreateGame from '../../hooks/queries/useCreateGame';
import { toast } from 'react-toastify';

export default function ItemCreate() {
  const { mutate } = useCreateGame();
  // 엔터키 입력 방지 핸들러
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // 기본 동작(줄바꿈) 방지
    }
  };

  const textarea1Ref = useRef(null);
  const textarea2Ref = useRef(null);
  const handleInput = (event, textareaRef) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleOnclick = () => {
    const firstItemText = textarea1Ref.current.value;
    const secondItemText = textarea2Ref.current.value;

    if (firstItemText.trim() !== '' && secondItemText.trim() !== '') {
      mutate({ firstItemText, secondItemText });
    } else {
      toast.error('게임 등록에 실패했습니다. 모든 항목을 입력해주세요.');
    }
  };

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
        <S.Button onClick={handleOnclick}>등록하기</S.Button>
      </S.ButtonContainer>
    </>
  );
}
