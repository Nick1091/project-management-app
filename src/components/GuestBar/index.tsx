import { Box, Button, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const GuestBar = () => {
  const { t } = useTranslation(['common']);
  return (
    <>
      <Box mr={3}>
        <Link color="inherit" style={{ textDecoration: 'none' }} component={RouterLink} to="/login">
          <Button color="inherit" variant="outlined">
            {t('SignIn')}
          </Button>
        </Link>
      </Box>
      <Link
        color="inherit"
        style={{ textDecoration: 'none' }}
        component={RouterLink}
        to="/register"
      >
        <Button color="secondary" variant="contained">
          {t('SignUp')}
        </Button>
      </Link>
    </>
  );
};
