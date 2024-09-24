import styled from 'styled-components';

export const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  font-family: 'HSSantokki2-Regular';
  margin-top: 3.2rem;
  grid-template-columns: repeat(3, 1fr); /* 3개의 열 생성 */
`;

export const TextBox = styled.textarea`
  outline: none;
  border: none;
  background-color: transparent;
  text-align: center;
  justify-content: center;
  font-size: 3.4rem;
  font-family: 'HSSantokki2-Regular';
  word-break: break-all;
  overflow: hidden;
  resize: none; // 크기 조정 비활성화
`;

export const ItemList = styled.div`
  vertical-align: middle;
  word-break: keep-all;
  width: 100%;
  padding: 5rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 2rem; /* 왼쪽 위 */
  font-size: 3.4rem;
  height: 30rem;
  border-top: 0.2rem solid ${(props) => props.theme.colors.black};
  border-left: 0.2rem solid ${(props) => props.theme.colors.black};
  border-bottom: 0.2rem solid ${(props) => props.theme.colors.black};
  background-color: ${(props) => props.theme.colors.primaryBlue};

  ::placeholder {
    color: black; /* 원하는 색상으로 변경 */
    opacity: 0.2; /* 투명도를 명시적으로 설정 */
  }
`;

export const ItemList2 = styled.div`
  word-break: keep-all;
  width: 100%;
  padding: 5rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-right-radius: 2rem; /* 오른쪽 위 */
  font-size: 3.4rem;
  height: 30rem;
  border: 0.2rem solid ${(props) => props.theme.colors.black};
  background-color: ${(props) => props.theme.colors.primaryGreen};

  ::placeholder {
    color: black; /* 원하는 색상으로 변경 */
    opacity: 0.2; /* 투명도를 명시적으로 설정 */
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10rem;
`;

export const Button = styled.button`
  width: 16rem;
  height: 7rem;
  border-radius: 1.5rem;
  border: 0.2rem solid ${(props) => props.theme.colors.black};
  font-size: 2.2rem;
  font-family: 'Pretendard-semibold';
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.gray150};

  &:hover {
    transition: 0.5s ease;
    background-color: ${(props) => props.theme.colors.gray200};
  }
`;
