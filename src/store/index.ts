import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';

const store = configureStore({
  reducer: {
    authUser: authSlice,
  },
});

export default store;
