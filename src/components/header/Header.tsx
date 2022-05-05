import { AppBar, Box, Button, Container, IconButton, Link, Toolbar } from '@mui/material';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { LocalizationToggler } from '../localizationTogger/LocalizationTogger';
import { Typography } from './Header-styles';

export const Header = () => {
  //this is for checking until authorization functionality is implemented
  const token = '1';
  const [scroll, setScroll] = useState(0);
  const appBarTopStyle = token && scroll > 0 ? 0 : '-100px';

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AppBar
        position={token ? 'sticky' : 'static'}
        sx={{ top: appBarTopStyle, transition: 'top 0.5s ease-in-out' }}
      >
        <Container>
          <Toolbar>
            <AppRegistrationOutlinedIcon sx={{ fontSize: 30 }}></AppRegistrationOutlinedIcon>
            <Typography>Project Management App</Typography>
            {token ? (
              <>
                <LocalizationToggler />
                <IconButton color="inherit">
                  <AddToQueueIcon sx={{ fontSize: 30, mr: '15px' }}></AddToQueueIcon>
                </IconButton>
                <IconButton color="inherit">
                  <Link color="inherit" component={RouterLink} to="/edit-profile">
                    <ManageAccountsIcon sx={{ fontSize: 30, mr: '15px' }}></ManageAccountsIcon>
                  </Link>
                </IconButton>
                <Button color="secondary" variant="contained">
                  Logout
                </Button>
              </>
            ) : (
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
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
