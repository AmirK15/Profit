import { createBrowserRouter } from 'react-router-dom';
import { Home, History } from '../views';
import { Layout } from '../components';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/history', element: <History /> },
    ],
  },
]);
