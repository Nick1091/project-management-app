import { useEffect, useState } from 'react';
import { Container, Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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
  const {
    authUser: { error: errorAuth },
  } = useAppSelector((state) => state.authUser);
  const [showModal, setShowModal] = useState(false);
  const [showConnectionMessage, setShowConnectionMessage] = useState(false);
  const handleCloseConnectionMessage = () => setShowConnectionMessage(false);
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
    if (
      errorMainBoard === 'Network Error' ||
      errorBoard === 'Network Error' ||
      errorAuth === 'Network Error'
    ) {
      dispatch(removeErrorMain());
      dispatch(removeErrorBoard());
      setShowConnectionMessage(true);
    }
    if (errorAuth === 'Network Error') {
      dispatch(removeUser());
      setShowConnectionMessage(true);
    }
  }, [dispatch, errorMainBoard, errorBoard, errorAuth]);

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
          {showConnectionMessage && (
            <Snackbar
              open={showConnectionMessage}
              autoHideDuration={5000}
              onClose={handleCloseConnectionMessage}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              message={t('ConnectionError')}
              action={
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={handleCloseConnectionMessage}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              }
            />
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
};
