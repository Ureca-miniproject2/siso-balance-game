import { createBrowserRouter } from 'react-router-dom';
import GlobalLayout from './layout/GlobalLayout';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import CreatePage from './pages/CreatePage/CreatePage';
import GamePage from './pages/GamePage/GamePage';
import MyGamePage from './pages/MyGamePage/MyGamePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: '/game/:id', element: <GamePage /> },
      {
        path: '/login',
        element: <LoginPage />,
      },
      { path: '/create', element: <CreatePage /> },
      { path: '/item', element: <MyGamePage /> },
    ],
  },
]);
