import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import boardsReducer from './boardsSlice';

const store = configureStore({
  reducer: {
    authUser: authSlice,
    boardsState: boardsReducer,
  },
});

export default store;
