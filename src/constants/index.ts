import igorPhoto from '../assets/img/igor.png';
import nickPhoto from '../assets/img/nick.png';
import annPhoto from '../assets/img/ann.png';

const URL = 'https://project-management-app-65.herokuapp.com';

export const REQUEST_URLS = {
  SING_UP_URL: `${URL}/signup`,
  SING_IN_URL: `${URL}/signin`,
  BOARDS_URL: `${URL}/boards`,
  USERS: `${URL}/users`,
};
export const contacts = [
  {
    name: 'Igor Alyanoy',
    link: 'https://github.com/alyanoyigor',
    id: 0,
    linkedIn: 'https://www.linkedin.com/in/alyanoyigor/',
    photo: `${igorPhoto}`,
  },
  {
    name: 'Nikolaу Kuckharchuk',
    link: 'https://github.com/Nick1091',
    id: 1,
    linkedIn: 'https://www.linkedin.com/in/nickolai-nick-7a0a00b2/',
    photo: `${nickPhoto}`,
  },
  {
    name: 'Anna Voroshilova',
    link: 'https://github.com/VoroshilovaAV',
    id: 2,
    linkedIn: 'https://www.linkedin.com/in/anna-voroshilova/',
    photo: `${annPhoto}`,
  },
];
const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '1920px',
  desktopL: '2560px',
};
export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktopL})`,
};
