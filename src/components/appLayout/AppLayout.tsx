import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';

export const AppLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};
