import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { LocalizationToggler } from '../LocalizationToggler';

export const GuestBar = () => {
  const { t } = useTranslation(['common']);
  return (
    <>
      <LocalizationToggler />
      <Box mr={3}>
        <Button color="inherit" variant="outlined">
          {t('LogIn')}
        </Button>
      </Box>
      <Button color="secondary" variant="contained">
        {t('SignUp')}
      </Button>
    </>
  );
};
