import styled from '@emotion/styled';
import { AppBar, Box, Button, Container, IconButton, Toolbar } from '@mui/material';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';

import { LocalizationToggler } from './LocalizationTogger';

const Typography = styled.p`
  font-size: 1.2em;
  margin-right: auto;
  margin-left: 10px;
`;

//this is for checking until authorization functionality is implemented
const token = '1';

export const Header = () => {
  return (
    <>
      <AppBar position={token ? 'sticky' : 'static'}>
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
