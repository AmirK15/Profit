import { FC, FormEvent, useState } from 'react';
import dayjs from 'dayjs';
import { Box, Button, Fab, Grid, Paper, SwipeableDrawer, TextField } from '@mui/material';
import { useTransactionsStore } from '../../store';
import AddIcon from '@mui/icons-material/Add';

// interface CreateFormProps {
//   isDrawerOpen: boolean;
//   setIsDrawerOpen: (value: boolean) => void;
// }

export const CreateForm: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    setIsOpen(false);
  };

  return (
    <>
      <SwipeableDrawer anchor='bottom' open={isOpen} onClose={() => setIsOpen(false)} onOpen={() => {}}>
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
      <Paper
        style={{ boxShadow: 'none', background: 'transparent' }}
        sx={{ position: 'fixed', bottom: 105, right: 50 }}
        elevation={3}>
        <Fab onClick={() => setIsOpen(true)} color='primary' aria-label='add'>
          <AddIcon />
        </Fab>
      </Paper>
    </>
  );
};
