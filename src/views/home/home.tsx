import { FC, FormEvent, useState } from 'react';
import dayjs from 'dayjs';
import { Box, Button, Grid, TextField, Autocomplete } from '@mui/material';
import { useTransactionsStore } from '../../store';

export const Home: FC = () => {
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const { getAllTransactions, createTransaction } = useTransactionsStore();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      createTransaction({
        sum: +price,
        category: category,
        description: description,
        date: dayjs().format('MMMM D, YYYY h:mm A'),
      });

      getAllTransactions();

      setPrice('');
      setCategory('');
      setDescription('');
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <>
      <Grid
        style={{ height: '90vh' }}
        container
        rowGap={2}
        direction='column'
        justifyContent='center'
        alignItems='center'>
        <Box
          style={{ display: 'flex', flexDirection: 'column', rowGap: '10px' }}
          onSubmit={handleSubmit}
          component='form'>
          <TextField
            autoFocus
            type='number'
            value={price}
            onChange={e => setPrice(e.target.value)}
            label='Price'
            variant='filled'
          />
          <Autocomplete
            autoFocus
            options={['Еда', 'Дорога']}
            value={category}
            onChange={(_, value) => {
              if (value) setCategory(value);
            }}
            renderInput={params => (
              <TextField
                {...params}
                value={category}
                onChange={e => setCategory(e.target.value)}
                label='Category'
                variant='filled'
              />
            )}
          />
          <Autocomplete
            options={['Обед', 'Такси']}
            value={description}
            onChange={(_, value) => {
              if (value) setDescription(value);
            }}
            renderInput={params => (
              <TextField
                {...params}
                value={description}
                onChange={e => setDescription(e.target.value)}
                label='Description'
                variant='filled'
              />
            )}
          />
          <Button type='submit' variant='outlined'>
            Submit
          </Button>
        </Box>
      </Grid>
    </>
  );
};
