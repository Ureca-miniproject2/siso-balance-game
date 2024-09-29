import * as S from './Header.styled';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { UserInfoContext } from '../../context/UserInfoContext';

export default function Header() {
  const location = useLocation();
  const { userInfo, logout } = useContext(UserInfoContext);

  const handleLogout = () => {
    logout();
  };
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
          {userInfo?.user_id ? (
            <S.HeaderNavItem to="/" isPage={location.pathname === '/'} onClick={handleLogout}>
              로그아웃
            </S.HeaderNavItem>
          ) : (
            <S.HeaderNavItem to="/login" isPage={location.pathname === '/login'}>
              로그인
            </S.HeaderNavItem>
          )}
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
