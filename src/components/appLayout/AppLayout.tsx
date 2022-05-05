import { Outlet } from 'react-router-dom';
import { Header } from '../header/Header';

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
