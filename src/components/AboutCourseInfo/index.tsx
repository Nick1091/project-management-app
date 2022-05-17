import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import PaidIcon from '@mui/icons-material/Paid';
import courseImg from '../../assets/img/course.png';
import {
  CourseContainer,
  CourseInfoContainer,
  MainCourseInfo,
  NameCourse,
  Subtitle,
} from './styled';

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
            <NameCourse>{t('ReactDevelopment')}</NameCourse>
            {t('Course')}
          </Typography>
          <Subtitle>{t('FreeCourse')}</Subtitle>
          <MainCourseInfo>
            <Box
              sx={{
                maxWidth: 290,
                maxHeight: 150,
              }}
            >
              <AccessibilityNewIcon sx={{ height: '30px', width: '30px', color: '#139CFF' }} />
              <Typography sx={{ fontSize: '20px', color: '0E2A4B' }}>{t('ForEveryone')}</Typography>
              <Typography sx={{ fontSize: '16px', color: '#7E7878' }}>
                {t('EveryoneCan')}
              </Typography>
            </Box>
            <Box
              sx={{
                maxWidth: 290,
                maxHeight: 150,
              }}
            >
              <PaidIcon sx={{ height: '30px', width: '30px', color: '#139CFF' }} />
              <Typography sx={{ fontSize: '20px', color: '0E2A4B' }}>
                {t('FreeEducation')}
              </Typography>
              <Typography sx={{ fontSize: '16px', color: '#7E7878' }}>
                {t('PayItForward')}
              </Typography>
            </Box>
          </MainCourseInfo>
        </CourseInfoContainer>
        <Box
          component="img"
          sx={{
            maxHeight: 630,
            maxWidth: 460,
            marginRight: 10,
          }}
          alt="course image"
          src={courseImg}
        />
      </CourseContainer>
    </Box>
  );
};
