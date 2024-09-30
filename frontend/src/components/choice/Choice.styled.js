import styled, { keyframes } from 'styled-components';

export const ItemContainer = styled.div`
  width: 100%;
  height: 34vh;
  display: table;
  display: flex;
  font-family: 'HSSantokki2-Regular';
  margin-top: 2rem;

  grid-template-columns: repeat(3, 1fr); /* 3개의 열 생성 */
`;

export const ItemList = styled.div`
  position: relative;
  word-break: break-all;
  width: 50%;
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
  border-right: 0.1rem solid ${(props) => props.theme.colors.black};
  background-color: ${(props) =>
    props.iscolored ? props.theme.colors.primaryBlue : props.theme.colors.gray500};
`;

export const ItemList2 = styled.div`
  position: relative;
  word-break: break-all;
  width: 50%;
  padding: 5rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-right-radius: 2rem; /* 오른쪽 위 */
  font-size: 3.4rem;
  height: 100%;
  border-top: 0.2rem solid ${(props) => props.theme.colors.black};
  border-bottom: 0.2rem solid ${(props) => props.theme.colors.black};
  border-right: 0.2rem solid ${(props) => props.theme.colors.black};
  border-left: 0.1rem solid ${(props) => props.theme.colors.black};
  background-color: ${(props) =>
    props.iscolored ? props.theme.colors.primaryGreen : props.theme.colors.gray500};
  z-index: 0;
`;

export const itemText = styled.div`
  font-size: 3.4rem;
  position: absolute;
  z-index: 2;
`;

// keyframes을 동적으로 생성
const growHeight = (percent) => keyframes`
  0% {
    height: 0;
  }
  100% {
    height: ${percent}%;
  }
`;

export const percentBox = styled.div`
  display: ${(props) => (props.isshow ? 'block' : 'none')};
  background-color: ${(props) =>
    props.first
      ? props.isselected
        ? props.theme.colors.percentBoxBlue
        : props.theme.colors.gray350
      : props.isselected
      ? props.theme.colors.percentBoxGreen
      : props.theme.colors.gray350};
  width: 100%;
  bottom: 0;
  position: absolute;
  z-index: 1;
  border-radius: ${(props) => (props.first ? '2rem 0 0 0' : '0 2rem 0 0')};
  animation: ${(props) => growHeight(props.percent)} 0.7s ease-in-out forwards;
`;

export const percentText = styled.div`
  position: absolute;
  bottom: 2.7rem;
  right: 2.7rem;
  font-family: 'pretendard';
  font-weight: 600;
  font-size: 2.2rem;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.black};
  border-radius: 1rem;
  padding: 0.5rem 2.5rem;
  z-index: 2;
`;
