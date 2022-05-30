import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { REQUEST_URLS } from '../constants';
import { EditTaskType, ILoginObj, ILoginObjWithID, TypeUpdateTask } from '../types';
import { CreateTaskType, DeleteTaskType } from '../types';

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
        error = 'noServerResponse';
      } else {
        error = err.response?.status.toString();
      }
    }
    return thunkApi.rejectWithValue(error);
  }
});

export const deleteUser = createAsyncThunk(
  'delete/deleteUser',
  async ({ token, id }: { token: string; id: string }, thunkApi) => {
    try {
      const response = await axios.delete(`${REQUEST_URLS.USERS}/${id}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      localStorage.removeItem('token');
      return response.data;
    } catch (err) {
      let error = ((err as AxiosError).response?.data as { statusCode: string; message: string })
        .message;
      if (axios.isAxiosError(err)) {
        if (!err?.response) {
          error = 'noServerResponse';
        }
      }
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const getUserId = createAsyncThunk('get/getUser', async (token: string, thunkApi) => {
  try {
    const response = await axios.get(REQUEST_URLS.USERS, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    return response.data;
  } catch (err) {
    let error = ((err as AxiosError).response?.data as { statusCode: string; message: string })
      .message;
    if (axios.isAxiosError(err)) {
      if (!err?.response) {
        error = 'noServerResponse';
      }
    }
    return thunkApi.rejectWithValue(error);
  }
});

export const putCredentialsData = createAsyncThunk(
  'put/putCredentialsData',
  async (data: ILoginObjWithID, thunkApi) => {
    try {
      const response = await axios.put(
        `${REQUEST_URLS.USERS}/${data.id}`,
        JSON.stringify({ name: data.name, login: data.login, password: data.password }),
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + data.token,
          },
        }
      );
      return response.data;
    } catch (err) {
      let error = ((err as AxiosError).response?.data as { statusCode: string; message: string })
        .message;
      if (axios.isAxiosError(err)) {
        if (!err?.response) {
          error = 'noServerResponse';
        }
      }
      return thunkApi.rejectWithValue(error);
    }
  }
);

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
    const token = response.data;
    return { ...token, login: data.login };
  } catch (err) {
    let error = ((err as AxiosError).response?.data as { statusCode: string; message: string })
      .message;
    if (axios.isAxiosError(err)) {
      if (!err?.response) {
        error = 'noServerResponse';
      } else {
        error = err.response?.status.toString();
      }
    }
    return thunkApi.rejectWithValue(error);
  }
});

export const getBoards = createAsyncThunk(
  'boards/getBoards',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(REQUEST_URLS.BOARDS_URL, {
        headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (e) {
      let error = 'noServerResponse';
      if (e instanceof AxiosError && e.response) {
        error = e.response.status.toString();
      }
      return rejectWithValue(error);
    }
  }
);

export const createBoard = createAsyncThunk(
  'boards/createBoard',
  async (
    { token, title, description }: { token: string; title: string; description: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        REQUEST_URLS.BOARDS_URL,
        { title, description },
        {
          headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
        }
      );
      return response.data;
    } catch (e) {
      let error = 'noServerResponse';
      if (e instanceof AxiosError && e.response) {
        error = e.response.status.toString();
      }
      return rejectWithValue(error);
    }
  }
);

export const deleteBoard = createAsyncThunk(
  'boards/deleteBoard',
  async ({ token, id }: { token: string; id: string }, { rejectWithValue }) => {
    try {
      await axios.delete(`${REQUEST_URLS.BOARDS_URL}/${id}`, {
        headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
      });
      return id;
    } catch (e) {
      let error = 'noServerResponse';
      if (e instanceof AxiosError && e.response) {
        error = e.response.status.toString();
      }
      return rejectWithValue(error);
    }
  }
);

export const getBoardById = createAsyncThunk(
  'boards/getBoardById',
  async ({ token, id }: { token: string; id: string }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${REQUEST_URLS.BOARDS_URL}/${id}`, {
        headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (e) {
      if (e instanceof Error) return rejectWithValue(e.message);
    }
  }
);

export const editBoard = createAsyncThunk(
  'boards/editBoard',
  async (
    {
      token,
      id,
      title,
      description,
    }: { token: string; id: string; title: string; description: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${REQUEST_URLS.BOARDS_URL}/${id}`,
        { title, description },
        {
          headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
        }
      );
      return response.data.title;
    } catch (e) {
      if (e instanceof Error) return rejectWithValue(e.message);
    }
  }
);

export const createBoardColumn = createAsyncThunk(
  'board/createColumn',
  async (
    { token, boardId, columnTitle }: { token: string; boardId: string; columnTitle: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${REQUEST_URLS.BOARDS_URL}/${boardId}/columns`,
        { title: columnTitle },
        {
          headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
        }
      );
      return response.data;
    } catch (e) {
      if (e instanceof Error) return rejectWithValue(e.message);
    }
  }
);

export const deleteBoardColumn = createAsyncThunk(
  'board/deleteBoardColumn',
  async (
    { token, boardId, columnId }: { token: string; boardId: string; columnId: string },
    { rejectWithValue }
  ) => {
    try {
      await axios.delete(`${REQUEST_URLS.BOARDS_URL}/${boardId}/columns/${columnId}`, {
        headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
      });
      return columnId;
    } catch (e) {
      if (e instanceof Error) return rejectWithValue(e.message);
    }
  }
);

export const updateBoardColumn = createAsyncThunk(
  'board/updateBoardColumn',
  async (
    {
      token,
      boardId,
      column,
    }: { token: string; boardId: string; column: { id: string; title: string; order: number } },
    { rejectWithValue }
  ) => {
    try {
      const { id, title, order } = column;
      const response = await axios.put(
        `${REQUEST_URLS.BOARDS_URL}/${boardId}/columns/${id}`,
        { title, order },
        {
          headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
        }
      );
      return response.data;
    } catch (e) {
      if (e instanceof Error) return rejectWithValue(e.message);
    }
  }
);

export const createTask = createAsyncThunk(
  'task/createTask',
  async (
    { token, boardId, columnId, taskTitle, userId, description }: CreateTaskType,
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${REQUEST_URLS.BOARDS_URL}/${boardId}/columns/${columnId}/tasks`,
        {
          title: taskTitle,
          description,
          userId,
        },
        {
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (e) {
      if (e instanceof Error) return rejectWithValue(e.message);
    }
  }
);
export const getBoardColumns = createAsyncThunk(
  'boards/getBoardColumns',
  async ({ token, id }: { token: string; id: string }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${REQUEST_URLS.BOARDS_URL}/${id}`, {
        headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
      });

      return response.data;
    } catch (e) {
      if (e instanceof Error) return rejectWithValue(e.message);
    }
  }
);

export const editTask = createAsyncThunk(
  'task/editTask',
  async (
    { token, boardId, columnId, taskId, taskTitle, order, userId, description }: EditTaskType,
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${REQUEST_URLS.BOARDS_URL}/${boardId}/columns/${columnId}/tasks/${taskId}`,
        {
          title: taskTitle,
          order,
          description,
          userId,
          boardId,
          columnId,
        },
        {
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (e) {
      if (e instanceof Error) return rejectWithValue(e.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'task/deleteTask',
  async ({ token, boardId, columnId, taskId }: DeleteTaskType, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${REQUEST_URLS.BOARDS_URL}/${boardId}/columns/${columnId}/tasks/${taskId}`,
        {
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        }
      );
      const data = { columnId, taskId };
      return data;
    } catch (e) {
      if (e instanceof Error) return rejectWithValue(e.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  'task/updateTask',
  async (
    { token, boardId, columnId, taskId, draggedTask }: TypeUpdateTask,
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${REQUEST_URLS.BOARDS_URL}/${boardId}/columns/${columnId}/tasks/${taskId}`,
        {
          ...draggedTask,
        },
        {
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (e) {
      if (e instanceof Error) return rejectWithValue(e.message);
    }
  }
);
