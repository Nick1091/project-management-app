import { Box, Typography } from '@mui/material';
import { MainWelcomeContent } from '../WelcomeInfo/styled';
import { AboutAppContainer } from './styled';
import BuildIcon from '@mui/icons-material/Build';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LanguageIcon from '@mui/icons-material/Language';
import PeopleIcon from '@mui/icons-material/People';

import appSrc from '../../assets/img/laptop.svg';

export const AboutAppInfo = () => {
  return (
    <Box
      sx={{
        maxWidth: 1920,
        minHeight: 700,
        paddingTop: 28,
      }}
    >
      <MainWelcomeContent>
        <Box
          component="img"
          sx={{
            maxHeight: 460,
            maxWidth: 460,
            marginRight: 10,
          }}
          alt="laptop image"
          src={appSrc}
        />
        <AboutAppContainer>
          <Box
            sx={{
              maxWidth: 278,
              maxHeight: 136,
            }}
          >
            <BuildIcon sx={{ height: '30px', width: '30px', color: '#139CFF' }} />
            <Typography sx={{ fontSize: '20px', color: '0E2A4B' }}>Simple interface</Typography>
            <Typography sx={{ fontSize: '16px', color: '#7E7878' }}>
              Register in a couple of clicks and try all the features of the application.
            </Typography>
          </Box>
          <Box
            sx={{
              maxWidth: 278,
              maxHeight: 136,
            }}
          >
            <AttachMoneyIcon sx={{ height: '30px', width: '30px', color: '#139CFF' }} />
            <Typography sx={{ fontSize: '20px', color: '0E2A4B' }}>Absolutely free</Typography>
            <Typography sx={{ fontSize: '16px', color: '#7E7878' }}>
              All features of the application are available without payment.
            </Typography>
          </Box>
          <Box
            sx={{
              maxWidth: 278,
              maxHeight: 136,
            }}
          >
            <LanguageIcon sx={{ height: '30px', width: '30px', color: '#139CFF' }} />
            <Typography sx={{ fontSize: '20px', color: '0E2A4B' }}>
              Dual language support
            </Typography>
            <Typography sx={{ fontSize: '16px', color: '#7E7878' }}>
              Use the functionality of the application by choosing a language convenient for you.
            </Typography>
          </Box>
          <Box
            sx={{
              maxWidth: 278,
              maxHeight: 136,
            }}
          >
            <PeopleIcon sx={{ height: '30px', width: '30px', color: '#139CFF' }} />
            <Typography sx={{ fontSize: '20px', color: '0E2A4B' }}>
              Manage projects with a team
            </Typography>
            <Typography sx={{ fontSize: '16px', color: '#7E7878' }}>
              Use different workspaces for personal tasks and team projects. Delegate management to
              colleagues.
            </Typography>
          </Box>
        </AboutAppContainer>
      </MainWelcomeContent>
    </Box>
  );
};
