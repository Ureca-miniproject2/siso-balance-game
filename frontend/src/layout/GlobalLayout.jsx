import { Outlet } from 'react-router-dom';
import * as S from './GlobalLayout.styled';
import Header from '../components/header/Header';

export default function GlobalLayout() {
  return (
    <S.GlobalLayoutContainer>
      <Header />
      <Outlet />
    </S.GlobalLayoutContainer>
  );
}
