import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Box, Typography } from '@mui/material';
import welcomeImg from '../../assets/img/welcome.png';
import { MainWelcomeContent, Wave } from './styled';
import 'react-lazy-load-image-component/src/effects/blur.css';

export const WelcomeInfo = () => {
  const { t } = useTranslation(['common']);

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
          <Typography sx={{ fontSize: '24px', color: '#7E7878' }}>{t('Welcome')}</Typography>
          <Typography sx={{ fontSize: '56px', fontWeight: '500', color: '#139CFF' }}>
            Reactive Area App
          </Typography>
          <Typography sx={{ fontSize: '18px', color: '#7E7878' }}>{t('AppDescription')}</Typography>
        </Box>
        <Box
          sx={{
            maxHeight: 630,
            maxWidth: 820,
            marginTop: 8,
          }}
        >
          <LazyLoadImage effect="blur" height={650} src={welcomeImg} width={670} />
        </Box>
      </MainWelcomeContent>
      <Wave />
    </Box>
  );
};
