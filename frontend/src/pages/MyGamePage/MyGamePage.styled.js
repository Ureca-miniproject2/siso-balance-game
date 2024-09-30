import styled from 'styled-components';

export const Container = styled.div`
  font-family: 'HSSantokki2-Regular';
  margin-top: 2rem;
  display: grid; /* Grid 레이아웃 사용 */
  grid-template-columns: repeat(3, 1fr); /* 3개의 열 생성 */
  gap: 3rem;
`;

export const ObserverDiv = styled.div`
  height: 20px;
`;
