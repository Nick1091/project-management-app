import { BOARDS_URL } from './../urls/urls';
import { BoardData, BoardsState } from './../types/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState: BoardsState = { boards: [], isLoading: false, error: null };

export const getBoards = createAsyncThunk(
  'boards/getBoards',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(BOARDS_URL, {
        headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (e) {
      if (e instanceof Error) return rejectWithValue(e.message);
    }
  }
);

export const createBoard = createAsyncThunk(
  'boards/createBoard',
  async ({ token, title }: { token: string; title: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        BOARDS_URL,
        { title },
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

export const deleteBoard = createAsyncThunk(
  'boards/deleteBoard',
  async ({ token, id }: { token: string; id: string }, { rejectWithValue }) => {
    try {
      await axios.delete(`${BOARDS_URL}/${id}`, {
        headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
      });
      return id;
    } catch (e) {
      if (e instanceof Error) return rejectWithValue(e.message);
    }
  }
);

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBoards.pending, (state: BoardsState) => {
      state.isLoading = true;
    });
    builder.addCase(
      getBoards.fulfilled,
      (state: BoardsState, action: PayloadAction<BoardData[]>) => {
        state.boards = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(getBoards.rejected, (state: BoardsState, action) => {
      state.error = action.payload as string;
      state.isLoading = false;
    });
    builder.addCase(
      createBoard.fulfilled,
      (state: BoardsState, action: PayloadAction<BoardData>) => {
        state.boards.push(action.payload);
      }
    );
    builder.addCase(deleteBoard.fulfilled, (state: BoardsState, action) => {
      state.boards = state.boards.filter((board) => board.id !== action.payload);
    });
  },
});

export const boardsReducer = boardsSlice.reducer;
