import { Box, Button } from '@mui/material';

import { LocalizationToggler } from '../localizationTogger/LocalizationTogger';

export const GuestBar = () => {
  return (
    <>
      <LocalizationToggler />
      <Box mr={3}>
        <Button color="inherit" variant="outlined">
          Log In
        </Button>
      </Box>
      <Button color="secondary" variant="contained">
        Sign up
      </Button>
    </>
  );
};
