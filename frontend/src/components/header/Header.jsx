import * as S from './Header.styled';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  return (
    <S.HeaderContainer>
      <S.HeaderWrapper>
        <Link
          to={`/`}
          style={{ textDecoration: 'none', color: 'inherit' }}
          isPage={location.pathname === '/'}
        >
          <S.HeaderTitle>SISO</S.HeaderTitle>
        </Link>
        <S.HeaderNav>
          <S.HeaderNavItem to="/login" isPage={location.pathname === '/login'}>
            로그인
          </S.HeaderNavItem>
          <S.HeaderNavItem to="/item" isPage={location.pathname === '/item'}>
            내 밸런스 게임
          </S.HeaderNavItem>
          <S.HeaderNavItem to="/create" isPage={location.pathname === '/create'}>
            밸런스게임만들기
          </S.HeaderNavItem>
        </S.HeaderNav>
      </S.HeaderWrapper>
    </S.HeaderContainer>
  );
}
