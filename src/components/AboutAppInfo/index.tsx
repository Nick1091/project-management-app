import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LanguageIcon from '@mui/icons-material/Language';
import PeopleIcon from '@mui/icons-material/People';
import {
  AboutAppContainer,
  AboutAppHeader,
  AboutAppText,
  Laptop,
  MainAboutAppContainer,
} from './styled';

export const AboutAppInfo = () => {
  const { t } = useTranslation(['common']);

  return (
    <Box
      sx={{
        maxWidth: 1920,
        minHeight: 480,
        paddingBottom: 4,
      }}
    >
      <MainAboutAppContainer>
        <Laptop />
        <AboutAppContainer>
          <Box
            sx={{
              maxWidth: 278,
            }}
          >
            <BuildIcon sx={{ height: '30px', width: '30px', color: '#139CFF' }} />
            <AboutAppHeader>{t('SimpleInterface')}</AboutAppHeader>
            <AboutAppText>{t('SimpleInterfaceInfo')}</AboutAppText>
          </Box>
          <Box
            sx={{
              maxWidth: 278,
            }}
          >
            <AttachMoneyIcon sx={{ height: '30px', width: '30px', color: '#139CFF' }} />
            <AboutAppHeader>{t('AbsolutelyFree')}</AboutAppHeader>
            <AboutAppText>{t('AbsolutelyFreeInfo')}</AboutAppText>
          </Box>
          <Box
            sx={{
              maxWidth: 278,
            }}
          >
            <LanguageIcon sx={{ height: '30px', width: '30px', color: '#139CFF' }} />
            <AboutAppHeader>{t('DualLanguage')}</AboutAppHeader>
            <AboutAppText>{t('DualLanguageInfo')}</AboutAppText>
          </Box>
          <Box
            sx={{
              maxWidth: 278,
            }}
          >
            <PeopleIcon sx={{ height: '30px', width: '30px', color: '#139CFF' }} />
            <AboutAppHeader>{t('ManageProjects')}</AboutAppHeader>
            <AboutAppText>{t('ManageProjectsInfo')}</AboutAppText>
          </Box>
        </AboutAppContainer>
      </MainAboutAppContainer>
    </Box>
  );
};
