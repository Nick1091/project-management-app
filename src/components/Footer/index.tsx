import { Link } from '@mui/material';
import { DevContact } from '../DevContact';
import rssLogo from '../../assets/icons/rs-school-logo.svg';
import { DevsContainer, FooterContainer } from './styled';
import { contacts } from '../../constants';

export const Footer = () => {
  return (
    <FooterContainer>
      <DevsContainer>
        <span>2022</span>
        <div>
          {contacts.map((item) => (
            <DevContact key={item.id} name={item.name} link={item.link} />
          ))}
        </div>
        <Link color="inherit" href="https://rs.school/react/">
          <img src={rssLogo} alt="RSS" />
        </Link>
      </DevsContainer>
    </FooterContainer>
  );
};
