import { Outlet } from 'react-router-dom';
import * as S from './GlobalLayout.styled';
import Header from '../components/header/header';
export default function GlobalLayout() {
  return (
    <S.GlobalLayoutContainer>
      <Header />
      <Outlet />
<<<<<<< HEAD
=======
      {/* {e.map((item) => {
        return (
          <div key={item.id}>
            <h2>{item.firstTitle}</h2>
            <p>{item.secondTitle}</p>
          </div>
        );
      })} */}
>>>>>>> 2064fba (feat:item레이이웃저장)
    </S.GlobalLayoutContainer>
  );
}
