import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { Link, MenuItem } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

type Props = { handleDrawerClose: () => void };

export const GuestBarMobile: React.FC<Props> = ({ handleDrawerClose }) => {
  const { t } = useTranslation(['common']);
  return (
    <>
      <Link color="inherit" style={{ textDecoration: 'none' }} component={RouterLink} to="/">
        <ChevronLeftIcon onClick={handleDrawerClose} />
      </Link>
      <Link color="inherit" style={{ textDecoration: 'none' }} component={RouterLink} to="/">
        <MenuItem onClick={handleDrawerClose}>{t('ToHomePage')}</MenuItem>
      </Link>
      <Link color="inherit" style={{ textDecoration: 'none' }} component={RouterLink} to="/login">
        <MenuItem onClick={handleDrawerClose}>{t('SignIn')}</MenuItem>
      </Link>
      <Link
        color="inherit"
        style={{ textDecoration: 'none' }}
        component={RouterLink}
        to="/register"
      >
        <MenuItem onClick={handleDrawerClose}>{t('SignUp')}</MenuItem>
      </Link>
    </>
  );
};
