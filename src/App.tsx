import { useEffect } from 'react';
import { useTransactionsStore } from './store';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

export const App = () => {
  const { getAllTransactions } = useTransactionsStore();

  useEffect(() => {
    getAllTransactions();
  }, []);

  return <RouterProvider router={router} />;
};
