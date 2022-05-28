import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Button, IconButton, Link, Box } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { LocalizationToggler } from '../LocalizationToggler';
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
    reset();
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
      handleCloseModal();
      navigate('/main/board/' + (await newBoard).payload.id);
    }
  };

  return (
    <>
      <LocalizationToggler />
      <Box sx={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <IconButton color="inherit" onClick={handleOpenModal}>
          <AddToQueueIcon sx={{ fontSize: 30 }} />
        </IconButton>
        <ModalWithForm<BoardInputs>
          titleText={t('CreateBoard')}
          inputs={getBoardInputs(errors, control)}
          handleSubmit={handleSubmit(handleBoardFormSubmit)}
          isModalOpened={isModalBoardOpened}
          handleCloseModal={handleCloseModal}
        />
        <Link color="inherit" component={RouterLink} to="/edit-profile">
          <IconButton color="inherit">
            <ManageAccountsIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Link>
        <Link color="inherit" style={{ textDecoration: 'none' }} component={RouterLink} to="/main">
          <Button color="inherit" variant="outlined">
            {t('GoToMainPage')}
          </Button>
        </Link>
        <Button color="info" onClick={logout} variant="contained">
          {t('SignOut')}
        </Button>
      </Box>
    </>
  );
};
