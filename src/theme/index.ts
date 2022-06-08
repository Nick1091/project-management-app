import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      light: '#4850F5',
      main: '#0A12C0',
      dark: '#080E90',
      contrastText: '#fff',
    },
    secondary: {
      light: '#FB6644',
      main: '#C92804',
      dark: '#651402',
      contrastText: '#fff',
    },
    error: {
      light: '#F54848',
      main: '#EE0505',
      dark: '#C00A0A',
    },
    warning: {
      light: '#FBBD44',
      main: '#EE9F05',
      dark: '#B07503',
    },
    info: {
      light: '#78508A',
      main: '#422C4C',
      dark: '#322139',
    },
    success: {
      light: '#039509',
      main: '#04D00D',
      dark: '#04B30B',
    },
    grey: {
      100: '#A4B6BF',
      200: '#77919F',
      300: '#637E8D',
      400: '#536A76',
      500: '#495D67',
      600: '#3E5059',
      700: '#34424A',
    },
  },
});
