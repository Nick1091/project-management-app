import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { REQUEST_URLS } from '../constants';
import { EditTaskType, ILoginObj, ILoginObjWithID, TypeUpdateTask } from '../types';
import { CreateTaskType, DeleteTaskType } from '../types';

const handleError = (e: unknown) => {
  let error = 'noServerResponse';
  if (e instanceof AxiosError && e.response) {
    error = e.response.status.toString();
  }
  if (e instanceof AxiosError && e.code === 'ERR_NETWORK') {
    error = 'NetworkError';
  }
  return error;
};

export const fetchLogin = createAsyncThunk(
  'post/fetchLogin',
  async (data: ILoginObj, { rejectWithValue }) => {
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
    } catch (e) {
      return rejectWithValue(handleError(e));
    }
  }
);

export const deleteUser = createAsyncThunk(
  'delete/deleteUser',
  async ({ token, id }: { token: string; id: string }, { rejectWithValue }) => {
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
    } catch (e) {
      return rejectWithValue(handleError(e));
    }
  }
);
export const getUserId = createAsyncThunk(
  'get/getUser',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(REQUEST_URLS.USERS, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      return response.data;
    } catch (e) {
      return rejectWithValue(handleError(e));
    }
  }
);

export const putCredentialsData = createAsyncThunk(
  'put/putCredentialsData',
  async (data: ILoginObjWithID, { rejectWithValue }) => {
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
    } catch (e) {
      return rejectWithValue(handleError(e));
    }
  }
);

export const fetchToken = createAsyncThunk(
  'post/fetchToken',
  async (data: ILoginObj, { rejectWithValue }) => {
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
    } catch (e) {
      return rejectWithValue(handleError(e));
    }
  }
);

export const getBoards = createAsyncThunk(
  'boards/getBoards',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(REQUEST_URLS.BOARDS_URL, {
        headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (e) {
      return rejectWithValue(handleError(e));
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
      return rejectWithValue(handleError(e));
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
      return rejectWithValue(handleError(e));
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
      return rejectWithValue(handleError(e));
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
      return rejectWithValue(handleError(e));
    }
  }
);

export const editBoardColumn = createAsyncThunk(
  'board/editBoardColumn',
  async (
    {
      token,
      boardId,
      columnId,
      columnTitle,
      columnOrder,
    }: {
      token: string;
      boardId: string;
      columnId: string;
      columnTitle: string;
      columnOrder: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${REQUEST_URLS.BOARDS_URL}/${boardId}/columns/${columnId}`,
        { title: columnTitle, order: columnOrder },
        {
          headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
        }
      );
      return response.data;
    } catch (e) {
      return rejectWithValue(handleError(e));
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
      return rejectWithValue(handleError(e));
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
      return rejectWithValue(handleError(e));
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
      return rejectWithValue(handleError(e));
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
      return rejectWithValue(handleError(e));
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
      return rejectWithValue(handleError(e));
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
      return rejectWithValue(handleError(e));
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
      return rejectWithValue(handleError(e));
    }
  }
);

export const getTasks = createAsyncThunk(
  'boards/getTasks',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(REQUEST_URLS.TASKS, {
        headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (e) {
      return rejectWithValue(handleError(e));
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
