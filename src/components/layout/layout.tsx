import { Outlet } from 'react-router-dom';
import { createTheme, ThemeProvider, Container } from '@mui/material';
import { CreateForm } from '../createForm';
import { Navbar } from '../navbar';

const theme = createTheme({
  typography: {
    fontFamily: 'Noto Sans',
  },
  palette: {
    primary: {
      main: '#2C2646',
    },
  },
});

export const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ height: '93vh', overflowY: 'auto' }}>
        <Outlet />
        <CreateForm />
      </Container>
      <Navbar />
    </ThemeProvider>
  );
};
