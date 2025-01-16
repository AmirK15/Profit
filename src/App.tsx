import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { useEffect, useState } from 'react';
import { useTransactionsStore } from './store';

export const App = () => {
  const { getAllTransactions } = useTransactionsStore();

  const [error, setError] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        await getAllTransactions();
      } catch (e) {
        if (typeof e === 'string') {
          setError(e);
        } else if (e instanceof Error) {
          setError(e.message);
        }
      }
    };

    getData();
  }, []);

  if (!!error.length) {
    return (
      <>
        Oops Error <br /> {error}
      </>
    );
  }

  return <RouterProvider router={router} />;
};
