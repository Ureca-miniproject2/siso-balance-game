import * as S from './Header.styled';
export default function Header() {
  return (
    <S.HeaderContainer>
      <S.HeaderWrapper>
        <S.HeaderTitle>SISO</S.HeaderTitle>
        <S.HeaderNav>
          <S.HeaderNavItem to="/">로그인</S.HeaderNavItem>
          <S.HeaderNavItem to="/item">내 밸런스 게임</S.HeaderNavItem>
          <S.HeaderNavItem to="/main">밸런스게임만들기</S.HeaderNavItem>
        </S.HeaderNav>
      </S.HeaderWrapper>
    </S.HeaderContainer>
  );
}
