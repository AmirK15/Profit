import { useEffect, useState } from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Container,
  createTheme,
  Fab,
  Grid,
  List,
  ListItemText,
  Paper,
  ThemeProvider,
  Typography,
} from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import FolderIcon from '@mui/icons-material/Folder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddIcon from '@mui/icons-material/Add';
import { useTransactionsStore } from './store';
import { CreateForm } from './components';

const theme = createTheme({
  typography: {
    fontFamily: 'Noto Sans',
  },
  palette: {
    primary: {
      main: '#917DE3',
    },
  },
});

export const App = () => {
  const { transactions, getAllTransactions } = useTransactionsStore();
  const [isOpen, setIsOpen] = useState(false);

  const [value, setValue] = useState('');

  useEffect(() => {
    getAllTransactions();
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container
          style={{
            background: '#1B1B29',
            color: '#fff',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Grid container direction='column' justifyContent='center' alignItems='center'>
            <Typography variant='h3' style={{ fontWeight: 700 }}>
              {transactions.reduce((acc, rec) => {
                return acc + rec.sum;
              }, 0)}
            </Typography>
            <List>
              {transactions.map(item => (
                <Grid key={item.id} container direction='row' columnGap={1}>
                  <ListItemText primary={item.sum} />
                  <ListItemText primary={item.description} />
                  <ListItemText primary={item.date} />
                </Grid>
              ))}
            </List>
          </Grid>
          <CreateForm isDrawerOpen={isOpen} setIsDrawerOpen={setIsOpen} />
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
