import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import dayjs from 'dayjs';
import { useTransactionsStore } from '../../store';

interface GroupedData {
  month: string;
  count: number;
}

interface Accumulator {
  [key: string]: GroupedData;
}

export const Home = () => {
  const { transactions, getAllTransactions } = useTransactionsStore();

  const [error, setError] = useState('');

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const currentMonth = dayjs().month();
  const currentYear = dayjs().year();

  const filteredData = transactions.filter(item => {
    const date = dayjs(item.date);
    return date.month() === currentMonth && date.year() === currentYear;
  });

  const groupedData = Object.values(
    transactions.reduce<Accumulator>((acc, item) => {
      const date = dayjs(item.date);
      const monthYear = date.format('YYYY-MMMM');

      if (!acc[monthYear]) {
        acc[monthYear] = { month: monthYear, count: 0 };
      }

      acc[monthYear].count += item.sum;
      return acc;
    }, {}),
  );

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

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
        <Typography variant='h6'>
          {months[currentMonth]} {currentYear}
        </Typography>
        <Typography variant='h3' style={{ fontWeight: 700 }}>
          {filteredData.reduce((acc, rec) => {
            return acc + rec.sum;
          }, 0)}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        {groupedData.map(item => (
          <Typography variant='h6'>
            {item.month} {item.count}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};
