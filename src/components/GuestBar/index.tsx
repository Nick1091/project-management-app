import { Box, Button, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { LocalizationToggler } from '../LocalizationToggler';

export const GuestBar = () => {
  return (
    <>
      <LocalizationToggler />
      <Box mr={3}>
        <Link color="inherit" style={{ textDecoration: 'none' }} component={RouterLink} to="/login">
          <Button color="inherit" variant="outlined">
            Sign In
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
          Sign up
        </Button>
      </Link>
    </>
  );
};
