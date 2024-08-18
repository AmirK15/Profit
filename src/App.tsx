import React, { FormEvent, useEffect, useState } from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Container,
  createTheme,
  Fab,
  Grid,
  List,
  ListItemText,
  Paper,
  SwipeableDrawer,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import FolderIcon from '@mui/icons-material/Folder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddIcon from '@mui/icons-material/Add';
import { teal } from '@mui/material/colors';
import { useTransactionsStore } from './store';

const theme = createTheme({
  typography: {
    fontFamily: 'Public Sans',
  },
  palette: {
    primary: {
      main: teal[500],
    },
  },
});

export const App = () => {
  const { transactions, getAllTransactions, createTransaction } = useTransactionsStore();
  const [isOpen, setIsOpen] = useState(false);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    getAllTransactions();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createTransaction({
      sum: +price,
      category: category,
      description: description,
      date: new Date('August 18, 2024 16:54:30').toString(),
    });
    getAllTransactions();
    setIsOpen(false);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container
          style={{
            background: '#1C252E',
            color: '#fff',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Grid container direction='column' justifyContent='center' alignItems='center'>
            <Typography variant='h3'>PROFIT</Typography>
            <List>
              {transactions.map(item => (
                <Grid container direction='row' columnGap={1}>
                  <ListItemText primary={item.sum} />
                  <ListItemText primary={item.description} />
                  <ListItemText primary={new Date(item.date).getDate()} />
                </Grid>
              ))}
            </List>
          </Grid>
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
                <TextField
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  label='Category'
                  variant='filled'
                />
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
              {value && <Typography style={{ textAlign: 'center' }}>{value} page</Typography>}
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
          <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
              value={value}
              onChange={(_, newValue) => {
                setValue(newValue);
              }}>
              <BottomNavigationAction label='Recents' value='recents' icon={<RestoreIcon color='primary' />} />
              <BottomNavigationAction label='Favorites' value='favorites' icon={<FavoriteIcon color='primary' />} />
              <BottomNavigationAction label='Archive' value='archive' icon={<ArchiveIcon color='primary' />} />
              <BottomNavigationAction label='Folder' value='folder' icon={<FolderIcon color='primary' />} />
              <BottomNavigationAction label='Nearby' value='nearby' icon={<LocationOnIcon color='primary' />} />
            </BottomNavigation>
          </Paper>
        </Container>
      </ThemeProvider>
    </>
  );
};
