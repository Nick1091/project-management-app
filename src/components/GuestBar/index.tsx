import { Box, Button } from '@mui/material';

import { LocalizationToggler } from '../LocalizationToggler';

export const GuestBar = () => {
  return (
    <>
      <LocalizationToggler />
      <Box mr={3}>
        <Button color="inherit" variant="outlined">
          Sign In
        </Button>
      </Box>
      <Button color="secondary" variant="contained">
        Sign up
      </Button>
    </>
  );
};
