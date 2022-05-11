import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';

export const AppLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
    </>
  );
};
