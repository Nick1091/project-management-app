import { Link } from '@mui/material';
import { DevContact } from '../DevContact';
import rssLogo from '../../assets/icons/rs-school-logo.svg';
import { DevsContainer, FooterContainer, RSSImg } from './styled';
import { contacts } from '../../constants';

export const Footer = () => {
  const colors: (
    | 'primary'
    | 'secondary'
    | 'info'
    | 'error'
    | 'inherit'
    | 'disabled'
    | 'action'
    | 'success'
    | 'warning'
  )[] = ['primary', 'secondary', 'info'];

  return (
    <FooterContainer>
      <DevsContainer>
        <span>2022</span>
        <div>
          {contacts.map((item, index) => (
            <DevContact key={item.id} color={colors[index]} name={item.name} link={item.link} />
          ))}
        </div>
        <Link color="inherit" href="https://rs.school/react/">
          <RSSImg src={rssLogo} alt="RSS" />
        </Link>
      </DevsContainer>
    </FooterContainer>
  );
};
