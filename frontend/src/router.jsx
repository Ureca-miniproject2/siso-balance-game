import { createBrowserRouter } from 'react-router-dom';
import GlobalLayout from './layout/GlobalLayout';
import MainPage from './pages/MainPage';
import GamePage from './pages/GamePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: '/game/:id', element: <GamePage /> },
    ],
  },
]);
