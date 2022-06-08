import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import mainSlice from './mainSlice';
import boardSlice from './boardSlice';
import searchSlice from './searchSlice';

const store = configureStore({
  reducer: {
    authUser: authSlice,
    mainBoards: mainSlice,
    boardState: boardSlice,
    tasksState: searchSlice,
  },
});

export default store;
