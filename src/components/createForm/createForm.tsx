import { FC, FormEvent, useState } from 'react';
import dayjs from 'dayjs';
import { Box, Button, Grid, SwipeableDrawer, TextField } from '@mui/material';
import { useTransactionsStore } from '../../store';

interface CreateFormProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (value: boolean) => void;
}

export const CreateForm: FC<CreateFormProps> = ({ isDrawerOpen, setIsDrawerOpen }) => {
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const { getAllTransactions, createTransaction } = useTransactionsStore();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createTransaction({
      sum: +price,
      category: category,
      description: description,
      date: dayjs().format('MMMM D, YYYY h:mm A'),
    });
    getAllTransactions();
    setIsDrawerOpen(false);
  };

  return (
    <SwipeableDrawer anchor='bottom' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} onOpen={() => {}}>
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
            type='number'
            value={price}
            onChange={e => setPrice(e.target.value)}
            label='Price'
            variant='filled'
          />
          <TextField value={category} onChange={e => setCategory(e.target.value)} label='Category' variant='filled' />
          <TextField
            value={description}
            onChange={e => setDescription(e.target.value)}
            label='Description'
            variant='filled'
          />
          <Button type='submit' variant='outlined'>
            Submit
          </Button>
        </Box>
      </Grid>
    </SwipeableDrawer>
  );
};
