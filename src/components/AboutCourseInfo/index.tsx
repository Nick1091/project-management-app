import { useTranslation } from 'react-i18next';
import { Box, Link, Typography } from '@mui/material';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import PaidIcon from '@mui/icons-material/Paid';
import {
  CourseContainer,
  CourseImage,
  CourseInfoContainer,
  MainCourseInfo,
  NameCourse,
  Subtitle,
} from './styled';
import { AboutAppText } from '../AboutAppInfo/styled';

export const AboutCourseInfo = () => {
  const { t } = useTranslation(['common']);

  return (
    <Box
      sx={{
        maxWidth: 1920,
        minHeight: 700,
        paddingTop: 6,
        paddingLeft: '24px',
      }}
    >
      <CourseContainer>
        <CourseInfoContainer>
          <Typography sx={{ fontSize: '26px', color: '#5f5b5b' }}>
            {t('AboutCourse')}
            <Link sx={{ textDecoration: 'none' }} href="https://rs.school/react/">
              <NameCourse>{t('ReactDevelopment')}</NameCourse>
            </Link>
            {t('Course')}
          </Typography>
          <Subtitle>{t('FreeCourse')}</Subtitle>
          <MainCourseInfo>
            <Box
              sx={{
                maxWidth: 290,
                paddingTop: 3,
                paddingBottom: 3,
              }}
            >
              <AccessibilityNewIcon sx={{ height: '30px', width: '30px', color: '#139CFF' }} />
              <Typography sx={{ fontSize: '20px', color: '0E2A4B' }}>{t('ForEveryone')}</Typography>
              <AboutAppText>{t('EveryoneCan')}</AboutAppText>
            </Box>
            <Box
              sx={{
                maxWidth: 290,
                paddingTop: 3,
                paddingBottom: 3,
              }}
            >
              <PaidIcon sx={{ height: '30px', width: '30px', color: '#139CFF' }} />
              <Typography sx={{ fontSize: '20px', color: '0E2A4B' }}>
                {t('FreeEducation')}
              </Typography>
              <AboutAppText>{t('PayItForward')}</AboutAppText>
            </Box>
          </MainCourseInfo>
        </CourseInfoContainer>
        <CourseImage />
      </CourseContainer>
    </Box>
  );
};
