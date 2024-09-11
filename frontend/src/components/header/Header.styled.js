import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 100%;
  font-family: 'HSSantokki2-Regular';
  font-size: 1.6rem;
  font-weight: 400;
  padding-bottom: 1.4rem;
  margin-top: 2.7rem;
  border-bottom: 2px solid #000;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

export const HeaderTitle = styled.h1`
  font-size: 4rem;
`;

export const HeaderNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 5rem;
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;
export const HeaderNavItem = styled(Link)`
  font-size: 2.4rem;
  font-weight: 400;
  color: #000;
  text-decoration: none;
  font-family: 'HSSantokki2-Regular';
`;
