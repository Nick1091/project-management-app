import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { Divider, Link, MenuItem } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';

type Props = { handleDrawerClose: () => void };

export const GuestBarMobile: React.FC<Props> = ({ handleDrawerClose }) => {
  const { t } = useTranslation(['common']);
  return (
    <>
      <Divider sx={{ marginRight: '8px' }} />
      <Link color="inherit" style={{ textDecoration: 'none' }} component={RouterLink} to="/">
        <MenuItem onClick={handleDrawerClose} sx={{ margin: '8px 0' }}>
          <HomeIcon color="action" sx={{ marginRight: '8px' }} /> {t('ToHomePage')}
        </MenuItem>
      </Link>
      <Link color="inherit" style={{ textDecoration: 'none' }} component={RouterLink} to="/login">
        <MenuItem onClick={handleDrawerClose} sx={{ margin: '8px 0' }}>
          <LoginIcon color="action" sx={{ marginRight: '8px' }} />
          {t('SignIn')}
        </MenuItem>
      </Link>
      <Link
        color="inherit"
        style={{ textDecoration: 'none' }}
        component={RouterLink}
        to="/register"
      >
        <MenuItem onClick={handleDrawerClose} sx={{ margin: '8px 0' }}>
          <HowToRegIcon color="action" sx={{ marginRight: '8px' }} />
          {t('SignUp')}
        </MenuItem>
      </Link>
    </>
  );
};
