import * as S from './CommentInput.styled';
import ArrowIcon from '../common/icon/ArrowIcon';
import { useContext, useState } from 'react';
import useCreateComment from '../../hooks/queries/useCreateComment';
import { UserInfoContext } from '../../context/UserInfoContext';
import { useNavigate } from 'react-router-dom';

export default function CommentInput(props) {
  const { itemId } = props;
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const { userInfo } = useContext(UserInfoContext);
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const { mutate } = useCreateComment(itemId);
  const handleSubmit = () => {
    if (inputValue === '') {
      return;
    }
    if (userInfo === null) {
      navigate('/login');
      return;
    }
    if (inputValue) {
      mutate({ comment_text: inputValue });
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      handleSubmit(); // Enter를 누르면 handleSubmit 실행
    }
  };
  return (
    <>
      <S.InputContainer>
        <S.TextInput
          onKeyDown={(e) => handleKeyPress(e)}
          value={inputValue}
          onChange={handleInputChange}
        />
        <S.ButtonClick onClick={handleSubmit} isActive={!!inputValue}>
          <ArrowIcon />
        </S.ButtonClick>
      </S.InputContainer>
    </>
  );
}
