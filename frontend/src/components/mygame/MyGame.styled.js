import styled from 'styled-components';

export const DeleteButton = styled.button`
  margin-top: -1rem;
  margin-left: 34.2rem;
  position: absolute;
  width: 5rem;
  height: 5rem;
  border-radius: 1rem;
  border: 2px solid ${(props) => props.theme.colors.black};
  background-color: ${(props) => props.theme.colors.gray150};

  &:hover {
    transition: 0.5s ease;
    background-color: ${(props) => props.theme.colors.gray200};
  }
`;

export const ItemContainer = styled.div`
  font-family: 'HSSantokki2-Regular';
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3개의 열 생성 */
  position: relative;
  gap: 3.2rem;
`;

export const ItemListContainer = styled.div`
  position: relative;
`;

export const ItemList = styled.div`
  word-break: keep-all;
  padding: 5rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  font-size: 2.4rem;
  width: 38.2rem;
  height: 14.7rem;
  border-top: 0.2rem solid ${(props) => props.theme.colors.black};
  border-left: 0.2rem solid ${(props) => props.theme.colors.black};
  border-right: 0.2rem solid ${(props) => props.theme.colors.black};
  background-color: ${(props) => props.theme.colors.primaryBlue};
`;

export const ItemList2 = styled.div`
  word-break: keep-all;
  padding: 5rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  font-size: 2.4rem;
  width: 38.2rem;
  height: 14.7rem;
  border: 0.2rem solid ${(props) => props.theme.colors.black};
  background-color: ${(props) => props.theme.colors.primaryBlue};
  background-color: ${(props) => props.theme.colors.primaryGreen};
`;
