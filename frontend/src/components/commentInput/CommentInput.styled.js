import styled from 'styled-components';

export const InputContainer = styled.div`
  display: flex;
  bottom: 4rem;
  align-items: center;
  width: 32%;
  position: fixed;
`;

export const TextInput = styled.input`
  position: fixed;
  width: 50rem;
  height: 5.2rem;
  border: 0.2rem solid ${(props) => props.theme.colors.gray400};
  border-radius: 1rem;
  font-size: 1.6rem;
  font-family: 'Pretendard-medium';
  padding-left: 2.4rem;
  background-color: ${(props) => props.theme.colors.gray150};
`;

export const ButtonClick = styled.button`
  position: fixed;
  width: 5.2rem;
  height: 5.2rem;
  border: 0.2rem solid ${(props) => props.theme.colors.gray400};
  margin-left: 54rem;
  border-radius: 1rem;
  background-color: ${(props) =>
    props.isActive ? props.theme.colors.black : props.theme.colors.gray350};

  svg {
    stroke: ${(props) => (props.isActive ? 'white' : props.theme.colors.black)};
  }

  ${(props) =>
    props.isActive &&
    `&:hover {
      background-color: ${props.theme.colors.gray400};
      transition: 0.5s ease;
    }`}
`;
