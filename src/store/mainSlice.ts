import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getBoards, createBoard, deleteBoard } from '../requests';
import { BoardPreview, MainBoards } from '../types/storeTypes';

const initialState: MainBoards = {
  isCreatingBoard: false,
  isDeletingBoard: false,
  isLoading: false,
  error: null,
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    removeError: (state) => {
      state.error = null;
    },
    setDeletingBoardId: (state, action) => {
      state.deletingBoardId = action.payload;
    },
  },
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
      state.isCreatingBoard = false;
    });
    builder.addCase(createBoard.pending, (state) => {
      state.isCreatingBoard = true;
    });
    builder.addCase(createBoard.rejected, (state, action) => {
      state.error = action.payload as string;
      state.isCreatingBoard = false;
    });
    builder.addCase(deleteBoard.fulfilled, (state, action) => {
      if (state.boards) {
        state.boards = state.boards.filter((board) => board.id !== action.payload);
      }
      state.isDeletingBoard = false;
      state.deletingBoardId = undefined;
    });
    builder.addCase(deleteBoard.pending, (state) => {
      state.isDeletingBoard = true;
    });
    builder.addCase(deleteBoard.rejected, (state, action) => {
      state.error = action.payload as string;
      state.isDeletingBoard = false;
      state.deletingBoardId = undefined;
    });
  },
});

export const { removeError, setDeletingBoardId } = mainSlice.actions;
export default mainSlice.reducer;
