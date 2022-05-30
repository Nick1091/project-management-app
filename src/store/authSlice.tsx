import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteUser, fetchLogin, fetchToken, getUserId, putCredentialsData } from '../requests';
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
    removeError: (state) => {
      state.authUser = {
        ...state.authUser,
        error: null,
      };
    },
    setUserCredentials: (
      state,
      action: PayloadAction<{ token: string; login: string; id: string }>
    ) => {
      state.authUser.token = action.payload.token;
      state.authUser.login = action.payload.login;
      state.authUser.id = action.payload.id;
    },
  },
  extraReducers: {
    [deleteUser.fulfilled.type]: (state) => {
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
    [deleteUser.pending.type]: (state) => {
      state.authUser.isLoading = true;
    },
    [deleteUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.authUser.error = action.payload;
      state.authUser.isLoading = false;
    },

    [getUserId.fulfilled.type]: (state, action: PayloadAction<UserID[]>) => {
      const userID = action.payload.find((user) => user.login === state.authUser.login)?.id;
      state.authUser.id = userID ?? null;
      state.authUser.error = null;
      state.authUser.isLoading = false;
    },
    [getUserId.pending.type]: (state) => {
      state.authUser.isLoading = true;
    },
    [getUserId.rejected.type]: (state, action: PayloadAction<string>) => {
      state.authUser.error = action.payload;
      state.authUser.isLoading = false;
    },

    [putCredentialsData.fulfilled.type]: (state, action: PayloadAction<UserID>) => {
      state.authUser.id = action.payload.id;
      state.authUser.name = action.payload.name;
      state.authUser.login = action.payload.login;
      state.authUser.error = null;
      state.authUser.isLoading = false;
    },
    [putCredentialsData.pending.type]: (state) => {
      state.authUser.isLoading = true;
    },
    [putCredentialsData.rejected.type]: (state, action: PayloadAction<string>) => {
      state.authUser.error = action.payload;
      state.authUser.isLoading = false;
    },

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
      state.authUser.login = action.payload.login;
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
export const { removeUser, setUserCredentials, removeError } = authSlice.actions;
export default authSlice.reducer;
