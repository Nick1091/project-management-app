import { BoardState, ColumnState, BoardPreview } from './../types/storeTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getBoardById, editBoard } from '../requests';

const initialState: BoardState = {
  columns: [],
  boardTitle: '',
  isLoading: false,
  error: null,
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBoardById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getBoardById.fulfilled,
      (state, action: PayloadAction<BoardPreview & { columns: ColumnState[] }>) => {
        state.columns = action.payload.columns;
        state.boardTitle = action.payload.title;
        state.isLoading = false;
      }
    );
    builder.addCase(editBoard.fulfilled, (state, action) => {
      state.boardTitle = action.payload;
    });
  },
});

export default boardSlice.reducer;
