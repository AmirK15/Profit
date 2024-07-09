import React, { FormEvent, useState } from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import FolderIcon from '@mui/icons-material/Folder';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export const App = () => {
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
      <Grid
        style={{ height: '100vh' }}
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
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}>
          <BottomNavigationAction label='Recents' value='recents' icon={<RestoreIcon />} />
          <BottomNavigationAction label='Favorites' value='favorites' icon={<FavoriteIcon />} />
          <BottomNavigationAction label='Archive' value='archive' icon={<ArchiveIcon />} />
          <BottomNavigationAction label='Folder' value='folder' icon={<FolderIcon />} />
          <BottomNavigationAction label='Nearby' value='nearby' icon={<LocationOnIcon />} />
        </BottomNavigation>
      </Paper>
    </>
  );
};
