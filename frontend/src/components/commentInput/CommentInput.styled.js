import styled from 'styled-components';

export const InputContainer = styled.div`
  display: flex;
  margin-top: 24rem;
  align-items: center;
  width: 100%;
`;

export const TextInput = styled.input`
  width: 81%;
  height: 5.2rem;
  border-radius: 1rem;
  font-size: 1.6rem;
  font-family: 'Pretendard-medium';
  padding-left: 2.4rem;
  background-color: ${(props) => props.theme.colors.gray150};
`;

export const ButtonClick = styled.button`
  width: 5.2rem;
  height: 5.2rem;
  margin-left: 2rem;
  border-radius: 1rem;
  background-color: ${(props) =>
    props.isActive ? props.theme.colors.black : props.theme.colors.gray350};

  ${(props) =>
    props.isActive &&
    `&:hover {
      background-color: ${props.theme.colors.gray400};
      transition: 0.5s ease;
    }`}
`;
