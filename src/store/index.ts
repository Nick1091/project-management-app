import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import mainSlice from './mainSlice';
import boardSlice from './boardSlice';

const store = configureStore({
  reducer: {
    authUser: authSlice,
    mainBoards: mainSlice,
    boardState: boardSlice,
  },
});

export default store;
