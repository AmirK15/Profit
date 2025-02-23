import { createBrowserRouter } from 'react-router-dom';
import { Home, History, CreateForm } from '../views';
import { Layout } from '../components';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/create', element: <CreateForm /> },
      { path: '/history', element: <History /> },
    ],
  },
]);
