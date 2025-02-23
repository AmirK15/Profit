import React, { useEffect, useState } from 'react';
import { List, ListItemText, Box, Button, Typography } from '@mui/material';
import { Transaction, useTransactionsStore } from '../../store';
import './history.css';
import dayjs from 'dayjs';

export const History = () => {
  const { transactions } = useTransactionsStore();
  const [data, setData] = useState<Transaction[]>([]);

  useEffect(() => {
    setData(
      transactions.sort((a, b) => {
        const dateA = dayjs(a.date);
        const dateB = dayjs(b.date);

        return dateB.year() - dateA.year() || dateB.month() - dateA.month() || dateB.date() - dateA.date();
      }),
    );
  }, [transactions]);

  const todaySum = data
    .filter(({ date }) => dayjs(date).format('MMMM D, YYYY') === dayjs().format('MMMM D, YYYY'))
    .reduce((acc, rec) => {
      return acc + rec.sum;
    }, 0);

  return (
    <>
      {!!todaySum && (
        <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '15px' }}>Today: {todaySum}</Box>
      )}
      <br />
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
