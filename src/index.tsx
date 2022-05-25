import React from 'react';
import ReactDOM from 'react-dom/client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import store from './store';
import { theme } from './constants';
import App from './App';
import './utils/i18n/localization';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </Provider>
      </DndProvider>
    </BrowserRouter>
  </React.StrictMode>
);
