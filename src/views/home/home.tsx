import React from 'react';
import { Typography, Box } from '@mui/material';
import { useTransactionsStore } from '../../store';

export const Home = () => {
  const { transactions } = useTransactionsStore();

  return (
    <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant='h3' style={{ fontWeight: 700 }}>
        {transactions.reduce((acc, rec) => {
          return acc + rec.sum;
        }, 0)}
      </Typography>
    </Box>
  );
};
