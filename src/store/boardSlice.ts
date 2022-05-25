import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardState, ColumnState, BoardPreview } from './../types/storeTypes';
import {
  getBoardById,
  editBoard,
  createBoardColumn,
  deleteBoardColumn,
  getBoardColumns,
} from '../requests';

const initialState: BoardState = {
  columns: [],
  boardTitle: '',
  boardDescription: '',
  isLoading: false,
  error: null,
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    removeAllColumns: (state) => {
      state.columns = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBoardById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getBoardById.fulfilled,
      (state, action: PayloadAction<BoardPreview & { columns: ColumnState[] }>) => {
        state.columns = action.payload.columns;
        state.boardTitle = action.payload.title;
        state.boardDescription = action.payload.description;
        state.isLoading = false;
      }
    );
    builder.addCase(editBoard.fulfilled, (state, action) => {
      state.boardTitle = action.payload;
    });
    builder.addCase(createBoardColumn.fulfilled, (state, action) => {
      state.columns.push(action.payload);
    });
    builder.addCase(deleteBoardColumn.fulfilled, (state, action) => {
      state.columns = state.columns.filter((column) => column.id !== action.payload);
    });
    builder.addCase(getBoardColumns.fulfilled, (state, action) => {
      state.columns = action.payload.columns;
    });
  },
});

export const { removeAllColumns } = boardSlice.actions;

export default boardSlice.reducer;
