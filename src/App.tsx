import React, { FormEvent, useState } from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Container,
  createTheme,
  Drawer,
  Fab,
  Grid,
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
import { green, teal } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: teal[500],
    },
  },
});

export const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formText, setFormText] = useState('');
  const [inputValue, setInputValue] = useState('');

  const [value, setValue] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormText(inputValue);
    setInputValue('');
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
          <Typography variant='h3'>PROFIT</Typography>
          <SwipeableDrawer anchor='bottom' open={isOpen} onClose={() => setIsOpen(false)} onOpen={() => {}}>
            <Grid
              style={{ height: '90vh' }}
              container
              rowGap={2}
              direction='column'
              justifyContent='center'
              alignItems='center'>
              {formText && <Typography style={{ textAlign: 'center' }}>{formText}$</Typography>}
              <Box
                style={{ display: 'flex', flexDirection: 'column', rowGap: '10px' }}
                onSubmit={handleSubmit}
                component='form'>
                <TextField
                  type='number'
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  label='Price'
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
              onChange={(event, newValue) => {
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
