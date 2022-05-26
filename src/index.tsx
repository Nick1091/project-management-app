import React from 'react';
import ReactDOM from 'react-dom/client';
import { DndProvider } from 'react-dnd';
import { ThemeProvider as MUIThemeProvider } from '@mui/system';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import store from './store';
import { theme } from './theme';
import App from './App';
import './utils/i18n/localization';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <MUIThemeProvider theme={theme}>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </MUIThemeProvider>
        </Provider>
      </DndProvider>
    </BrowserRouter>
  </React.StrictMode>
);
