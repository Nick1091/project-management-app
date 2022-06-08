import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Divider, Link } from '@mui/material';
import { MenuItem } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { removeUser } from '../../store/authSlice';
import { ModalWithForm } from '../ModalWithForm';
import { boardFormSchema } from '../../validation';
import { createBoard } from '../../requests';
import { getBoardInputs } from './getBoardInputs';
import { BoardInputs } from '../../types';

type Props = { handleDrawerClose: () => void };

export const UserBarMobile: React.FC<Props> = ({ handleDrawerClose }) => {
  const { t } = useTranslation(['common']);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isModalBoardOpened, setIsModalBoardOpened] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('login');
    dispatch(removeUser());
    handleDrawerClose();
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
      handleDrawerClose();
      navigate('/main/board/' + (await newBoard).payload.id);
    }
  };

  return (
    <>
      <Divider sx={{ marginRight: '8px' }} />
      <Link color="inherit" style={{ textDecoration: 'none' }} component={RouterLink} to="/search">
        <MenuItem onClick={handleDrawerClose} sx={{ margin: '8px 0' }}>
          <ManageSearchIcon color="action" sx={{ marginRight: '8px' }} />
          {t('GlobalSearch')}
        </MenuItem>
      </Link>
      <MenuItem onClick={handleOpenModal} sx={{ margin: '8px 0' }}>
        <AddToQueueIcon color="action" sx={{ marginRight: '8px' }} />
        {t('CreateNewBoard')}
      </MenuItem>
      <ModalWithForm<BoardInputs>
        titleText={t('CreateBoard')}
        inputs={getBoardInputs(errors, control)}
        handleSubmit={handleSubmit(handleBoardFormSubmit)}
        isModalOpened={isModalBoardOpened}
        handleCloseModal={handleCloseModal}
      />
      <Link
        color="inherit"
        style={{ textDecoration: 'none' }}
        component={RouterLink}
        to="/edit-profile"
      >
        <MenuItem onClick={handleDrawerClose} sx={{ margin: '8px 0' }}>
          <ManageAccountsIcon color="action" sx={{ marginRight: '8px' }} />
          {t('EditProfileMobile')}
        </MenuItem>
      </Link>
      <Link color="inherit" style={{ textDecoration: 'none' }} component={RouterLink} to="/main">
        <MenuItem onClick={handleDrawerClose} sx={{ margin: '8px 0' }}>
          <DashboardIcon color="action" sx={{ marginRight: '8px' }} />
          {t('GoToMainPage')}
        </MenuItem>
      </Link>
      <Link color="inherit" style={{ textDecoration: 'none' }} component={RouterLink} to="/main">
        <MenuItem onClick={logout} sx={{ margin: '8px 0' }}>
          <LogoutIcon color="action" sx={{ marginRight: '8px' }} />
          {t('SignOut')}
        </MenuItem>
      </Link>
    </>
  );
};
