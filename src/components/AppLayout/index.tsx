import { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { removeUser } from '../../store/authSlice';
import { removeError as removeErrorMain } from '../../store/boardSlice';
import { removeError as removeErrorBoard } from '../../store/mainSlice';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { ModalWithText } from '../ModalWithText';
import { useTranslation } from 'react-i18next';

export const AppLayout = () => {
  const dispatch = useAppDispatch();
  const { error: errorMainBoard } = useAppSelector((state) => state.mainBoards);
  const { error: errorBoard } = useAppSelector((state) => state.boardState);
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation(['common']);

  useEffect(() => {
    if (errorMainBoard === '401' || errorBoard === '401') {
      localStorage.removeItem('token');
      localStorage.removeItem('login');
      dispatch(removeErrorMain());
      dispatch(removeErrorBoard());
      dispatch(removeUser());
      setShowModal(true);
    }
  }, [dispatch, errorMainBoard, errorBoard]);

  return (
    <>
      <Header />
      <main>
        <Container maxWidth={false}>
          <Outlet />
          {showModal && (
            <>
              <ModalWithText
                isOpen={showModal}
                alertText={t('SessionOut')}
                closeModal={() => setShowModal(false)}
              />
            </>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
};
