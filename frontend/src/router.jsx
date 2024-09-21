import { createBrowserRouter } from 'react-router-dom';
import GlobalLayout from './layout/GlobalLayout';
import MainPage from './pages/MainPage';
import GamePage from './pages/GamePage';
import LoginPage from './pages/LoginPage/LoginPage';
import CreatePage from './pages/CreatePage/CreatePage';

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
    ],
  },
]);
