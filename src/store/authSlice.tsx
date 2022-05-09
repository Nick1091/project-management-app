import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchLogin, fetchToken } from '../requests';
import { TypeToken, UserID } from '../types';

type InitType = {
  name: string | null;
  login: string | null;
  password: string | null;
  token: string | null;
  id: string | null;
  error: string | null;
  isLoading: boolean;
};

type AuthType = {
  authUser: InitType;
};
const initialState: AuthType = {
  authUser: {
    name: null,
    login: null,
    password: null,
    token: null,
    id: null,
    error: null,
    isLoading: false,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    removeUser: (state) => {
      state.authUser = {
        name: null,
        login: null,
        password: null,
        token: null,
        id: null,
        error: null,
        isLoading: false,
      };
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.authUser.token = action.payload;
    },
  },
  extraReducers: {
    [fetchLogin.fulfilled.type]: (state, action: PayloadAction<UserID>) => {
      state.authUser.id = action.payload.id;
      state.authUser.name = action.payload.name;
      state.authUser.login = action.payload.login;
      state.authUser.error = null;
      state.authUser.isLoading = false;
    },
    [fetchLogin.pending.type]: (state) => {
      state.authUser.isLoading = true;
    },
    [fetchLogin.rejected.type]: (state, action: PayloadAction<string>) => {
      state.authUser.error = action.payload;
      state.authUser.id = null;
      state.authUser.name = null;
      state.authUser.login = null;
      state.authUser.isLoading = false;
    },
    [fetchToken.fulfilled.type]: (state, action: PayloadAction<TypeToken>) => {
      state.authUser.token = action.payload.token;
      state.authUser.error = null;
      state.authUser.isLoading = false;
    },
    [fetchToken.pending.type]: (state) => {
      state.authUser.isLoading = true;
    },
    [fetchToken.rejected.type]: (state, action: PayloadAction<string>) => {
      state.authUser.error = action.payload;
      state.authUser.id = null;
      state.authUser.name = null;
      state.authUser.login = null;
      state.authUser.token = null;
      state.authUser.isLoading = false;
    },
  },
});
export const { removeUser, setToken } = authSlice.actions;
export default authSlice.reducer;
