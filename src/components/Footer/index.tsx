import { useTranslation } from 'react-i18next';
import { Link } from '@mui/material';
import { DevContact } from '../DevContact';
import rssLogo from '../../assets/icons/rs-school-logo.svg';
import { DevsContainer, FooterContainer } from './styled';
import { contacts } from '../../constants';

export const Footer = () => {
  const { t } = useTranslation(['common']);
  const devChangingName = [`${t('Igor')}`, `${t('Nick')}`, `${t('Ann')}`];
  return (
    <FooterContainer>
      <DevsContainer>
        <span>2022</span>
        <div>
          {contacts.map((item, index) => (
            <DevContact key={item.id} name={devChangingName[index]} link={item.link} />
          ))}
        </div>
        <Link color="inherit" href="https://rs.school/react/">
          <img src={rssLogo} alt="RSS" />
        </Link>
      </DevsContainer>
    </FooterContainer>
  );
};
