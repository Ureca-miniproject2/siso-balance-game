import styled from 'styled-components';

export const ItemContainer = styled.div`
    margin-top: 12.9rem;
display: grid; /* Grid 레이아웃 사용 */
  grid-template-columns: repeat(3, 1fr); /* 3개의 열 생성 */
    gap: 3.2rem;
`;

export const ItemList = styled.div`
    text-align:center;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2rem;
    font-size: 2.4rem;
    width: 38.2rem;
    height: 14.7rem;
    border: 1px solid ${(props) => props.theme.colors.black};
    background-color: ${(props) => props.theme.colors.primaryBlue};
`;

export const ItemList2 = styled.div`
    text-align:center;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2rem;
    font-size: 2.4rem;
    width: 38.2rem;
    height: 14.7rem;
    border: 1px solid ${(props) => props.theme.colors.black};
    background-color: ${(props) => props.theme.colors.primaryBlue};
    background-color: ${(props) => props.theme.colors.primaryGreen};
`;