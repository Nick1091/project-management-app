import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Link } from '@mui/material';
import { MenuItem } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useAppDispatch } from '../../hooks';
import { removeUser } from '../../store/authSlice';

type Props = { handleDrawerClose: () => void };

export const UserBarMobile: React.FC<Props> = ({ handleDrawerClose }) => {
  const { t } = useTranslation(['common']);
  const dispatch = useAppDispatch();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('login');
    dispatch(removeUser());
    handleDrawerClose();
  };

  return (
    <>
      <Link color="inherit" style={{ textDecoration: 'none' }} component={RouterLink} to="/">
        <ChevronLeftIcon onClick={handleDrawerClose} />
      </Link>
      <MenuItem onClick={handleDrawerClose}>{t('CreateNewBoard')}</MenuItem>
      <Link
        color="inherit"
        style={{ textDecoration: 'none' }}
        component={RouterLink}
        to="/edit-profile"
      >
        <MenuItem onClick={handleDrawerClose}>{t('EditProfileMobile')}</MenuItem>
      </Link>
      <Link color="inherit" style={{ textDecoration: 'none' }} component={RouterLink} to="/main">
        <MenuItem onClick={handleDrawerClose}>{t('GoToMainPage')}</MenuItem>
      </Link>
      <Link color="inherit" style={{ textDecoration: 'none' }} component={RouterLink} to="/main">
        <MenuItem onClick={logout}>{t('SignOut')}</MenuItem>
      </Link>
    </>
  );
};
