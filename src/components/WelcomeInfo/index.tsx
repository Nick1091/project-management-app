import { Box, Typography } from '@mui/material';
import { MainWelcomeContent, Wave } from './styled';

import welcomeImg from '../../assets/img/welcomeImg.png';

export const WelcomeInfo = () => {
  return (
    <Box
      sx={{
        maxWidth: 1920,
        maxHeight: 760,
      }}
    >
      <MainWelcomeContent>
        <Box
          sx={{
            maxWidth: 700,
            maxHeight: 800,
            paddingLeft: '34px',
            paddingRight: '34px',
          }}
        >
          <Typography sx={{ fontSize: '24px', color: '#7E7878' }}>Welcome to the</Typography>
          <Typography sx={{ fontSize: '56px', color: '#139CFF' }}>Reactive Area App</Typography>
          <Typography sx={{ fontSize: '18px', color: '#7E7878' }}>
            This application is an easy-to-use and user-friendly project management software that
            will help you significantly increase the efficiency of your team at work
          </Typography>
        </Box>
        <Box
          component="img"
          sx={{
            maxHeight: 630,
            maxWidth: 820,
            marginTop: 5,
          }}
          alt="welcome image"
          src={welcomeImg}
        />
      </MainWelcomeContent>
      <Wave />
    </Box>
  );
};
