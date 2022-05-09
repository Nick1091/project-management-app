import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { REQUEST_URLS } from '../constants';
import { ILoginObj } from '../types';

export const fetchLogin = createAsyncThunk('post/fetchLogin', async (data: ILoginObj, thunkApi) => {
  try {
    const response = await axios.post(
      REQUEST_URLS.SING_UP_URL,
      JSON.stringify({ name: data.name, login: data.login, password: data.password }),
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (err) {
    let error = ((err as AxiosError).response?.data as { statusCode: string; message: string })
      .message;
    if (axios.isAxiosError(err)) {
      if (!err?.response) {
        error = 'no server response';
      }
    }
    return thunkApi.rejectWithValue(error);
  }
});

export const fetchToken = createAsyncThunk('post/fetchToken', async (data: ILoginObj, thunkApi) => {
  try {
    const response = await axios.post(
      REQUEST_URLS.SING_IN_URL,
      JSON.stringify({ login: data.login, password: data.password }),
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (err) {
    let error = ((err as AxiosError).response?.data as { statusCode: string; message: string })
      .message;
    if (axios.isAxiosError(err)) {
      if (!err?.response) {
        error = 'no server response';
      }
    }
    return thunkApi.rejectWithValue(error);
  }
});
