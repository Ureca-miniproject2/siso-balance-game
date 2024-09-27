import styled from 'styled-components';

export const ItemContainer = styled.div`
  width: 100%;
  height: 30vh;
  display: table;
  display: flex;
  font-family: 'HSSantokki2-Regular';
  margin-top: 3.2rem;
  grid-template-columns: repeat(3, 1fr); /* 3개의 열 생성 */
`;

export const ItemList = styled.div`
  word-break: keep-all;
  width: 100%;
  padding: 5rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 2rem; /* 왼쪽 위 */
  font-size: 3.4rem;
  height: 100%;
  border-top: 0.2rem solid ${(props) => props.theme.colors.black};
  border-left: 0.2rem solid ${(props) => props.theme.colors.black};
  border-bottom: 0.2rem solid ${(props) => props.theme.colors.black};
  background-color: ${(props) => props.theme.colors.primaryBlue};
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
  height: 100%;
  border: 0.2rem solid ${(props) => props.theme.colors.black};
  background-color: ${(props) => props.theme.colors.primaryGreen};
`;
