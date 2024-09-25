import styled from 'styled-components';

export const Kakaologin = styled.div`
  margin-top: 3rem;
  justify-content: center;
  display: flex;
  align-items: center;
`;

export const KakaoImage = styled.img`
  align-items: center;
  display: flex;
  width: 48rem;
  border-radius: 1.6rem;
  border: 0.2rem solid ${(props) => props.theme.colors.black};
`;

export const LoginText = styled.h1`
  line-height: 3rem;
  font-size: 2rem;
  margin-top: 12rem;
  text-align: center;
  font-family: 'Pretendard-medium';
  color: ${(props) => props.theme.colors.black};
`;
