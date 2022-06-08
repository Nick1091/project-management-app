import { useEffect, useState } from 'react';
import { CircularProgress, Container, Snackbar, IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { removeUser, removeError as removeErrorAuth } from '../../store/authSlice';
import { removeError as removeErrorMain } from '../../store/boardSlice';
import { removeError as removeErrorBoard } from '../../store/mainSlice';
import { removeError as removeErrorSearch } from '../../store/searchSlice';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { ModalWithText } from '../ModalWithText';
import { useTranslation } from 'react-i18next';

export const AppLayout = () => {
  const dispatch = useAppDispatch();
  const { error: errorMainBoard } = useAppSelector((state) => state.mainBoards);
  const { error: errorBoard } = useAppSelector((state) => state.boardState);
  const { error: errorSearch } = useAppSelector((state) => state.tasksState);
  const {
    authUser: { error: errorAuth },
  } = useAppSelector((state) => state.authUser);
  const [showModal, setShowModal] = useState(false);
  const [showConnectionMessage, setShowConnectionMessage] = useState(false);
  const handleCloseConnectionMessage = () => setShowConnectionMessage(false);
  const { t } = useTranslation(['appErrors']);
  const [statusError, setStatusError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (
      errorMainBoard === '401' ||
      errorBoard === '401' ||
      errorAuth === '401' ||
      errorSearch === '401'
    ) {
      setStatusError('401');
      localStorage.removeItem('token');
      localStorage.removeItem('login');
      dispatch(removeErrorMain());
      dispatch(removeErrorBoard());
      dispatch(removeErrorSearch());
      dispatch(removeUser());
      setShowModal(true);
    }
    if (
      errorMainBoard === 'NetworkError' ||
      errorBoard === 'NetworkError' ||
      errorAuth === 'NetworkError' ||
      errorSearch === 'NetworkError'
    ) {
      setStatusError('NetworkError');
      dispatch(removeErrorMain());
      dispatch(removeErrorBoard());
      dispatch(removeErrorAuth());
      dispatch(removeErrorSearch());
      setShowConnectionMessage(true);
    }

    if (errorBoard === '404') {
      setStatusError('404');
      dispatch(removeErrorBoard());
      setShowModal(true);
      navigate('/main');
    }
    if (errorBoard === '404column') {
      setStatusError('404column');
      dispatch(removeErrorBoard());
      setShowModal(true);
    }
    if (errorBoard === '404task') {
      setStatusError('404task');
      dispatch(removeErrorBoard());
      setShowModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, errorMainBoard, errorBoard, errorAuth, errorSearch]);

  return (
    <>
      <Header />
      <main>
        <Container maxWidth={false}>
          <Suspense
            fallback={
              <Stack alignItems="center" sx={{ pt: '15vh' }}>
                <CircularProgress />
              </Stack>
            }
          >
            <Outlet />
          </Suspense>
          {showModal && (
            <ModalWithText
              isOpen={showModal}
              alertText={t(statusError)}
              closeModal={() => setShowModal(false)}
            />
          )}
          {showConnectionMessage && (
            <Snackbar
              open={showConnectionMessage}
              autoHideDuration={5000}
              onClose={handleCloseConnectionMessage}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              message={t(statusError)}
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
