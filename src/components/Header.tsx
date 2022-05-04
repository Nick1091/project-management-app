import styled from '@emotion/styled';
import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';

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
