import { AppBar, Container, Link, Toolbar } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { Link as RouterLink } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';

import { Typography } from './styled';
import { UserBar } from '../UserBar';
import { GuestBar } from '../GuestBar';

export const Header = () => {
  const {
    authUser: { token },
  } = useAppSelector((state) => state.authUser);
  const [scroll, setScroll] = useState(0);
  const appBarTopStyle = token && scroll > 0 ? '0' : '-100px';

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
        sx={{
          top: appBarTopStyle,
          transition: 'top 0.5s ease-in-out',
        }}
      >
        <Container maxWidth={false}>
          <Toolbar>
            <RocketLaunchIcon sx={{ fontSize: 30 }}></RocketLaunchIcon>
            <Typography>
              <Link
                color="inherit"
                style={{ textDecoration: 'none' }}
                component={RouterLink}
                to="/"
              >
                Reactive Area
              </Link>
            </Typography>
            {token ? <UserBar /> : <GuestBar />}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
