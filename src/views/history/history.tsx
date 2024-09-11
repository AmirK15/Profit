import React, { useEffect, useState } from 'react';
import { List, ListItemText, Box, Button, Typography } from '@mui/material';
import { Transaction, useTransactionsStore } from '../../store';
import './history.css';
import dayjs from 'dayjs';

export const History = () => {
  const { transactions } = useTransactionsStore();
  const [data, setData] = useState<Transaction[]>([]);
  const [showSum, setShowSum] = useState(false);

  useEffect(() => {
    setData(
      transactions
        .sort((a, b) => dayjs(b.date).date() - dayjs(a.date).date())
        .sort((a, b) => dayjs(b.date).month() - dayjs(a.date).month()),
    );
  }, [transactions]);

  const changeCategory = () => {
    setData(data.filter(item => item.description.includes('обед')));
    setShowSum(true);
  };

  const resetCategory = () => {
    setData(transactions);
    setShowSum(false);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', columnGap: '15px', marginBlock: '25px' }}>
        <Button variant='contained' onClick={changeCategory}>
          Food
        </Button>
        <Button variant='contained' onClick={resetCategory}>
          Reset
        </Button>
      </Box>
      {showSum && (
        <Typography sx={{ textAlign: 'center' }} variant='h6' style={{ fontWeight: 700 }}>
          {data.reduce((acc, rec) => {
            return acc + rec.sum;
          }, 0)}
        </Typography>
      )}
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <List sx={{ width: '80%', display: 'flex', flexDirection: 'column', rowGap: '15px' }}>
          {data.map(item => (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                height: '80px',
                padding: '0 20px',
                borderRadius: '8px',
                boxShadow: '0 4px 28px rgba(37, 76, 152, 0.18)',
              }}>
              <ListItemText primary={item.category} secondary={item.description} />
              <ListItemText
                className='listItem__sum'
                sx={{ textAlign: 'right' }}
                primary={item.sum}
                secondary={item.date}
              />
            </Box>
          ))}
        </List>
      </Box>
    </>
  );
};
