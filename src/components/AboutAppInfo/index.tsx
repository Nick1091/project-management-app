import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LanguageIcon from '@mui/icons-material/Language';
import PeopleIcon from '@mui/icons-material/People';
import appSrc from '../../assets/img/laptop.svg';
import { MainWelcomeContent } from '../WelcomeInfo/styled';
import { AboutAppContainer } from './styled';

export const AboutAppInfo = () => {
  const { t } = useTranslation(['common']);

  return (
    <Box
      sx={{
        maxWidth: 1920,
        minHeight: 630,
        paddingTop: 20,
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
            <Typography sx={{ fontSize: '20px', color: '0E2A4B' }}>
              {t('SimpleInterface')}
            </Typography>
            <Typography sx={{ fontSize: '16px', color: '#7E7878' }}>
              {t('SimpleInterfaceInfo')}
            </Typography>
          </Box>
          <Box
            sx={{
              maxWidth: 278,
              maxHeight: 136,
            }}
          >
            <AttachMoneyIcon sx={{ height: '30px', width: '30px', color: '#139CFF' }} />
            <Typography sx={{ fontSize: '20px', color: '0E2A4B' }}>
              {t('AbsolutelyFree')}
            </Typography>
            <Typography sx={{ fontSize: '16px', color: '#7E7878' }}>
              {t('AbsolutelyFreeInfo')}
            </Typography>
          </Box>
          <Box
            sx={{
              maxWidth: 278,
              maxHeight: 136,
            }}
          >
            <LanguageIcon sx={{ height: '30px', width: '30px', color: '#139CFF' }} />
            <Typography sx={{ fontSize: '20px', color: '0E2A4B' }}>{t('DualLanguage')}</Typography>
            <Typography sx={{ fontSize: '16px', color: '#7E7878' }}>
              {t('DualLanguageInfo')}
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
              {t('ManageProjects')}
            </Typography>
            <Typography sx={{ fontSize: '16px', color: '#7E7878' }}>
              {t('ManageProjectsInfo')}
            </Typography>
          </Box>
        </AboutAppContainer>
      </MainWelcomeContent>
    </Box>
  );
};
