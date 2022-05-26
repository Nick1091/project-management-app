import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Button, IconButton, Link } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
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
  } = useForm<BoardInputs>({ resolver: yupResolver(boardFormSchema) });

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
      <IconButton color="inherit" onClick={handleOpenModal}>
        <AddToQueueIcon sx={{ fontSize: 30, mr: '15px' }}></AddToQueueIcon>
      </IconButton>
      <ModalWithForm<BoardInputs>
        titleText={t('CreateBoard')}
        inputs={getBoardInputs(errors, control)}
        handleSubmit={handleSubmit(handleBoardFormSubmit)}
        isModalOpened={isModalBoardOpened}
        handleCloseModal={handleCloseModal}
      />
      <IconButton color="inherit">
        <Link color="inherit" component={RouterLink} to="/edit-profile">
          <ManageAccountsIcon sx={{ fontSize: 30, mr: '15px' }}></ManageAccountsIcon>
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
