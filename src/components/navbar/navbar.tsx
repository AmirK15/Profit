import React from 'react';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

export const Navbar = () => {
  return (
    <Paper sx={{ height: '7vh', position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation>
        <Link to='/'>
          <BottomNavigationAction label='Home' icon={<HomeRoundedIcon color='primary' />} />
        </Link>
        <Link to='/stats'>
          <BottomNavigationAction label='List' icon={<QueryStatsIcon color='primary' />} />
        </Link>
        <Link to='/history'>
          <BottomNavigationAction label='List' icon={<FormatListBulletedIcon color='primary' />} />
        </Link>
      </BottomNavigation>
    </Paper>
  );
};
