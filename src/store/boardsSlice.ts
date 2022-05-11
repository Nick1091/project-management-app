import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getBoards, createBoard, deleteBoard } from '../requests';
import { BoardData, BoardsState } from './../types/storeTypes';

const initialState: BoardsState = { boards: [], isLoading: false, error: null };

const boardsSlice = createSlice({
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

export default boardsSlice.reducer;
