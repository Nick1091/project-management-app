import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { contacts } from '../../constants';
import { DevCard } from '../DevCard';
import { CardsContainer } from './styled';

export const AboutTeamInfo = () => {
  const { t } = useTranslation(['common']);

  const devChangingInformation = [
    {
      name: `${t('Igor')}`,
      info: `${t('TeamLead')}`,
    },
    {
      name: `${t('Nick')}`,
      info: `${t('Developer')}`,
    },
    {
      name: `${t('Ann')}`,
      info: `${t('Developer')}`,
    },
  ];

  return (
    <Box
      bgcolor="#EDEDEF"
      sx={{
        maxWidth: 1920,
        minHeight: 450,
        width: '98.748vw',
        paddingTop: 4,
      }}
    >
      <Typography
        sx={{
          fontSize: '20px',
          color: '#504D66',
          fontWeight: '500',
          textAlign: 'center',
          marginBottom: '30px',
        }}
      >
        {t('AboutTeam')}
      </Typography>
      <CardsContainer>
        {contacts.map((item) => (
          <DevCard
            key={item.id}
            name={devChangingInformation[item.id].name}
            gh={item.link}
            info={devChangingInformation[item.id].info}
            linkedIn={item.linkedIn}
            photo={item.photo}
          />
        ))}
      </CardsContainer>
    </Box>
  );
};
