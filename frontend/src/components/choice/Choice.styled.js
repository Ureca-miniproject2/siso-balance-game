import styled from 'styled-components';

export const ItemContainer = styled.div`
    font-family:"HSSantokki2-Regular";
    margin-top: 3.2rem;
    display: grid; /* Grid 레이아웃 사용 */
    grid-template-columns: repeat(3, 1fr); /* 3개의 열 생성 */
`;

export const ItemList = styled.div`
    padding: 5rem;
    text-align:center;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2rem;
    font-size: 3.4rem;
    width: 60.7rem;
    height: 34.2rem;
    border: 0.2rem solid ${(props) => props.theme.colors.black};
    background-color: ${(props) => props.theme.colors.gray200};
`;

export const ItemList2 = styled.div`
    padding: 5rem;
    text-align:center;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2rem;
    font-size: 3.4rem;
    width: 60.7rem;
    height: 34.2rem;
    border: 0.2rem solid ${(props) => props.theme.colors.black};
    background-color: ${(props) => props.theme.colors.primaryGreen};
`;