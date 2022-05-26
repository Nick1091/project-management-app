import { useTranslation } from 'react-i18next';
import { Button, IconButton, Link, Box } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import { Link as RouterLink } from 'react-router-dom';
import { LocalizationToggler } from '../LocalizationToggler';
import { useAppDispatch } from '../../hooks';
import { removeUser } from '../../store/authSlice';

export const UserBar = () => {
  const { t } = useTranslation(['common']);
  const dispatch = useAppDispatch();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('login');
    dispatch(removeUser());
  };

  return (
    <>
      <LocalizationToggler />
      <Box sx={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <IconButton color="inherit">
          <AddToQueueIcon sx={{ fontSize: 30 }} />
        </IconButton>
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
