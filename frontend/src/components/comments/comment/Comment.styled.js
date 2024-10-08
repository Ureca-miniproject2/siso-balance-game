import styled from 'styled-components';

export const CommentContainer = styled.div`
  width: 100%;
  background-color: ${(props) =>
    props.isBest ? props.theme.colors.gray150 : props.theme.colors.gray100};
  border-right: 0.1rem solid ${(props) => props.theme.colors.gray200};
  padding: 2.5rem;
`;

export const BestButton = styled.div`
  font-family: 'Pretendard-semibold';
  display: ${(props) => (props.isBest ? 'flex' : 'none')};
  width: 4.8rem;
  height: 2rem;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.bestButtonColor ? props.theme.colors.primaryGreen : props.theme.colors.primaryBlue};
  border-radius: 10rem;
  margin-right: 0.8rem;
  font-size: 1.2rem;
`;

export const LikeContainer = styled.div`
  display: flex;
  margin-left: auto;
`;

export const HeartIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    fill: ${(props) =>
      props.isHeart
        ? props.theme.colors.primaryRed
        : props.theme.colors.gray350}; /* 호버 시 색상 변경 */

    &:hover {
      fill: ${(props) => props.theme.colors.primaryRed};
    }
  }

  &:hover {
    transform: scale(1.1);
    transition: transform 0.5s ease, fill 0.5s ease;
  }
`;

export const TopContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const NickNameStyle = styled.div`
  font-family: 'Pretendard-bold';
  font-size: 1.6rem;
  color: ${(props) => props.theme.colors.black};
`;

export const CommentStyle = styled.div`
  word-break: keep-all;
  width: 85%;
  margin-top: 1rem;
  font-family: 'Pretendard-medium';
  font-size: 1.6rem;
  color: ${(props) => props.theme.colors.black};
`;

export const TimeStyle = styled.div`
  margin-left: 1.2rem;
  font-family: 'Pretendard-semibold';
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.gray300};
`;

export const TrashIcon = styled.div`
  margin-left: 1.4rem;
  display: ${(props) => (props.isTrash ? 'flex' : 'none')};
  cursor: pointer;
  svg {
    stroke: ${(props) => props.theme.colors.gray300};
    &:hover {
      fill: ${(props) => props.theme.colors.gray350};
      stroke: ${(props) => props.theme.colors.gray400};
      transition: transform 0.5s ease, fill 0.5s ease;
    }
  }
`;

export const LikeStyle = styled.div`
  /* position: absolute; */
  display: flex;
  align-items: center;
  font-family: 'Pretendard-semibold';
  font-size: 1.6rem;
  margin-left: 0.6rem;
  color: ${(props) => props.theme.colors.gray300};
`;
