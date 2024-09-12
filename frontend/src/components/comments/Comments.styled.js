import styled from 'styled-components';

export const CommentContainer = styled.div`
    width: 100%;
    background-color: ${(props) => props.theme.colors.gray100};
    border-right: 0.1rem solid ${(props) => props.theme.colors.gray200};
    padding: 2.5rem;
`;

export const CommentContainer2 = styled.div`
    width: 100%;
    background-color: ${(props) => props.theme.colors.gray100};
    border-left: 0.1rem solid ${(props) => props.theme.colors.gray200};
    padding: 2.5rem;
`;

export const Container = styled.div`
    display: flex;
`;

export const LikeContainer = styled.div`
    display: flex;
    margin-left: auto;
`;

export const HeartIcon = styled.div`
    display: flex;
    width: 1.9rem;
    height: 1.9rem;
    justify-content: center;
    align-items: center;
`;

export const TopContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`;

export const NickNameStyle = styled.div`
    font-family: "Pretendard-bold";
    font-size: 1.6rem;
    color: ${(props) => props.theme.colors.black};
`;

export const CommentStyle = styled.div`
    width: 90%;
    margin-top: 1rem;
    font-family: "Pretendard-medium";
    font-size: 1.6rem;
    color: ${(props) => props.theme.colors.black};
`;

export const TimeStyle = styled.div`
    margin-left: 1.2rem;
    font-family: "Pretendard-semibold";
    font-size: 1.4rem;
    color: ${(props) => props.theme.colors.gray300};
`;

export const LikeStyle = styled.div`
    /* position: absolute; */
    display: flex;
    align-items: center;
    font-family: "Pretendard-semibold";
    font-size: 1.6rem;
    margin-left: 0.6rem;
    color: ${(props) => props.theme.colors.gray300};
`;