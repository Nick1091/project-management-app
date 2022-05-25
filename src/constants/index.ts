import { createTheme } from '@mui/material/styles';
import { ItemTypesType } from '../types';
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

export const ItemTypes: ItemTypesType = {
  COLUMN: 'column',
};

export const COLORS = {
  MAIN: {
    darken: '#050960',
    dark: '#080E90',
    normal: '#0A12C0',
    light: '#0C15E5',
    lighter: '#4850F5',
    lightest: '#B6B9FB',
  },
  SECOND: {
    darken: '#651402',
    dark: '#971E03',
    normal: '#C92804',
    light: '#EE2F05',
    lighter: '#FB6644',
    lightest: '#ffd4cb',
  },
  GRAY: {
    darken: '#212A2F',
    dark: '#324047',
    normal: '#536A76',
    light: '#637F8D',
    lighter: '#7893A0',
    lightest: '#90A6B1',
  },
};

type ColorShades = {
  darken: string;
  dark: string;
  normal: string;
  light: string;
  lighter: string;
  lightest: string;
};

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      main: ColorShades;
      second: ColorShades;
      gray: ColorShades;
      violet: ColorShades;
      error: string;
      danger: string;
    };
  }

  interface ThemeOptions {
    status?: {
      main?: ColorShades;
      second?: ColorShades;
      gray?: ColorShades;
      violet?: ColorShades;
      error?: string;
      danger?: string;
    };
  }
}

export const theme = createTheme({
  status: {
    danger: '#EE9F05',
    error: '#EE0505',
    main: {
      darken: '#050960',
      dark: '#080E90',
      normal: '#0A12C0',
      light: '#0C15E5',
      lighter: '#4850F5',
      lightest: '#B6B9FB',
    },
    second: {
      darken: '#651402',
      dark: '#971E03',
      normal: '#C92804',
      light: '#EE2F05',
      lighter: '#FB6644',
      lightest: '#ffd4cb',
    },
    gray: {
      darken: '#212A2F',
      dark: '#324047',
      normal: '#536A76',
      light: '#637F8D',
      lighter: '#7893A0',
      lightest: '#90A6B1',
    },
    violet: {
      darken: '#291C30',
      dark: '#322139',
      normal: '#C00A77',
      light: '#78508A',
      lighter: '#A784B8',
      lightest: '#D3C1DB',
    },
  },
});
