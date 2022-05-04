import { AppBar, Box, Button, Container, IconButton, Toolbar } from '@mui/material';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import styled from '@emotion/styled';

import { LocalizationToggler } from './LocalizationTogger';
import { useEffect, useState } from 'react';

const Typography = styled.p`
  font-size: 1.2em;
  margin-right: auto;
  margin-left: 10px;
`;

export const Header = () => {
  //this is for checking until authorization functionality is implemented
  const token = '1';

  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', () => setScroll(window.scrollY));
    return () => window.removeEventListener('scroll', () => setScroll(window.scrollY));
  }, []);

  return (
    <>
      <AppBar
        position={token ? 'sticky' : 'static'}
        sx={
          token && scroll > 0
            ? { top: 0, transition: 'top 0.5s ease-in-out' }
            : { top: '-100px', transition: 'top 0.05s ease-in-out' }
        }
      >
        <Container>
          <Toolbar>
            <AppRegistrationOutlinedIcon sx={{ fontSize: 30 }}></AppRegistrationOutlinedIcon>
            <Typography>Project Management App</Typography>
            {token ? (
              <>
                <LocalizationToggler></LocalizationToggler>
                <IconButton color="inherit" aria-label="add to shopping cart">
                  <AddToQueueIcon sx={{ fontSize: 30, mr: '15px' }}></AddToQueueIcon>
                </IconButton>
                <IconButton color="inherit" aria-label="add to shopping cart">
                  <ManageAccountsIcon sx={{ fontSize: 30, mr: '15px' }}></ManageAccountsIcon>
                </IconButton>
                <Button color="secondary" variant="contained">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <LocalizationToggler></LocalizationToggler>
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
