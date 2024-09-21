import styled from 'styled-components';

export const ItemContainer = styled.div`
    font-family:"HSSantokki2-Regular";
    margin-top: 3.2rem;
    display: grid; /* Grid 레이아웃 사용 */
    grid-template-columns: repeat(3, 1fr); /* 3개의 열 생성 */
    gap: 3.2rem;
`;

export const ItemList = styled.div`
    word-break: keep-all;
    padding: 5rem;
    text-align:center;
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
    text-align:center;
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