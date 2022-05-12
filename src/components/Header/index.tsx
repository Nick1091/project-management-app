import { AppBar, Container, Toolbar } from '@mui/material';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Typography } from './styled';
import { UserBar } from '../UserBar';
import { GuestBar } from '../GuestBar';

export const Header = () => {
  const { t } = useTranslation(['common']);
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
            <Typography>{t('ProjectManagementApp')}</Typography>
            {token ? <UserBar /> : <GuestBar />}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
