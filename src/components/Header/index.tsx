import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Container, Drawer, IconButton, Link, Toolbar } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import useWindowDimensions, { useAppSelector } from '../../hooks';
import { Typography } from './styled';
import { UserBar } from '../UserBar';
import { GuestBar } from '../GuestBar';
import { UserBarMobile } from '../UserBar/UserBarMobile';
import { GuestBarMobile } from '../GuestBar/GuestBarMobile';
import { size } from '../../constants';
import { LocalizationToggler } from '../LocalizationToggler';

export const Header = () => {
  const {
    authUser: { token },
  } = useAppSelector((state) => state.authUser);
  const [scroll, setScroll] = useState(0);
  const [open, setOpen] = useState(false);
  const appBarTopStyle = token && scroll > 0 ? 0 : '-100px';
  const { width } = useWindowDimensions();

  const handleScroll = () => {
    setScroll(window.scrollY);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
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
            {width >= size.laptop && (
              <>
                {token ? (
                  <>
                    <Typography>Reactive Area</Typography>
                    <LocalizationToggler />
                    <UserBar />
                  </>
                ) : (
                  <>
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
                    <LocalizationToggler />
                    <GuestBar />
                  </>
                )}
              </>
            )}
            {width < size.laptop && (
              <>
                <LocalizationToggler />
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerOpen}
                >
                  <MenuIcon />
                </IconButton>
              </>
            )}
            <Drawer anchor="right" open={open} onClose={handleDrawerClose}>
              <ChevronRightIcon onClick={handleDrawerClose} sx={{ margin: '10px 0 10px 10px' }} />
              {token ? (
                <UserBarMobile handleDrawerClose={handleDrawerClose} />
              ) : (
                <GuestBarMobile handleDrawerClose={handleDrawerClose} />
              )}
            </Drawer>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
