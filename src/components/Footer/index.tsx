import { Link } from '@mui/material';

import { DevContact } from '../DevContact';
import rssLogo from '../../assets/icons/rs-school-logo.svg';

import { DevsContainer, FooterContainer } from './styled';

export const Footer = () => {
  const contacts = [
    { name: 'Igor Alyanoy', link: 'https://github.com/alyanoyigor', id: 0 },
    { name: 'Nikolaу Kuckharchuk', link: 'https://github.com/Nick1091', id: 1 },
    { name: 'Anna Voroshilova', link: 'https://github.com/VoroshilovaAV', id: 2 },
  ];

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
