import { Suspense } from 'react';
import { CircularProgress, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';

export const AppLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Container maxWidth={false}>
          <Suspense
            fallback={
              <Container sx={{ pt: '15vh', ml: '45%' }} maxWidth={false}>
                <CircularProgress />
              </Container>
            }
          >
            <Outlet />
          </Suspense>
        </Container>
      </main>
      <Footer />
    </>
  );
};
