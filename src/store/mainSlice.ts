import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getBoards, createBoard, deleteBoard } from '../requests';
import { BoardPreview, MainBoards } from '../types/storeTypes';

const initialState: MainBoards = { isLoading: false, error: null };

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBoards.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBoards.fulfilled, (state, action: PayloadAction<BoardPreview[]>) => {
      state.boards = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getBoards.rejected, (state, action) => {
      state.error = action.payload as string;
      state.isLoading = false;
    });
    builder.addCase(createBoard.fulfilled, (state, action: PayloadAction<BoardPreview>) => {
      if (!state.boards) {
        state.boards = [];
      }
      state.boards.push(action.payload);
    });
    builder.addCase(deleteBoard.fulfilled, (state, action) => {
      if (state.boards) {
        state.boards = state.boards.filter((board) => board.id !== action.payload);
      }
    });
  },
});

export default mainSlice.reducer;
