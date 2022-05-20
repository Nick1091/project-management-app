import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';

export const AppLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Container maxWidth={false}>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
};
