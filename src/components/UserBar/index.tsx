import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Button, IconButton, Link } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { removeUser } from '../../store/authSlice';
import { ModalWithForm } from '../ModalWithForm';
import { BoardInputs } from '../../types';
import { createBoard } from '../../requests';
import { boardFormSchema } from '../../validation';
import { getBoardInputs } from './getBoardInputs';

export const UserBar = () => {
  const { t } = useTranslation(['common']);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isModalBoardOpened, setIsModalBoardOpened] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('login');
    dispatch(removeUser());
  };

  const handleOpenModal = () => {
    setIsModalBoardOpened(true);
  };

  const handleCloseModal = () => {
    setIsModalBoardOpened(false);
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BoardInputs>({
    resolver: yupResolver(boardFormSchema),
    defaultValues: { title: '', description: '' },
  });

  const {
    authUser: { token },
  } = useAppSelector((state) => state.authUser);

  const handleBoardFormSubmit = async (formData: BoardInputs) => {
    if (token) {
      const newBoard = dispatch(
        createBoard({ token, title: formData.title, description: formData.description })
      );
      reset();
      handleCloseModal();
      navigate('/main/board/' + (await newBoard).payload.id);
    }
  };

  return (
    <>
      <IconButton color="inherit" sx={{ pb: '2px' }}>
        <Link color="inherit" component={RouterLink} to="/search">
          <ManageSearchIcon sx={{ fontSize: 35, mr: '15px' }} />
        </Link>
      </IconButton>
      <IconButton color="inherit" onClick={handleOpenModal} sx={{ pt: '4px', pb: '2px' }}>
        <AddToQueueIcon sx={{ fontSize: 29, mr: '15px', mt: 0 }} />
      </IconButton>
      <ModalWithForm<BoardInputs>
        titleText={t('CreateBoard')}
        inputs={getBoardInputs(errors, control)}
        handleSubmit={handleSubmit(handleBoardFormSubmit)}
        isModalOpened={isModalBoardOpened}
        handleCloseModal={handleCloseModal}
      />
      <IconButton color="inherit" sx={{ pb: '2px' }}>
        <Link color="inherit" component={RouterLink} to="/edit-profile">
          <ManageAccountsIcon sx={{ fontSize: 35, mr: '15px' }} />
        </Link>
      </IconButton>
      <Link color="inherit" style={{ textDecoration: 'none' }} component={RouterLink} to="/main">
        <Button color="inherit" variant="outlined" sx={{ mr: '15px' }}>
          {t('GoToMainPage')}
        </Button>
      </Link>
      <Button onClick={logout} color="secondary" variant="contained">
        {t('SignOut')}
      </Button>
    </>
  );
};
