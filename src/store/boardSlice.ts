import { BoardState, ColumnState, BoardPreview, TaskState } from './../types/storeTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  getBoardById,
  editBoard,
  createBoardColumn,
  createTask,
  editTask,
  deleteTask,
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

    builder.addCase(createTask.fulfilled, (state, action: PayloadAction<TaskState>) => {
      const columnIndex = state.columns.findIndex(
        (column) => column.id === action.payload.columnId
      );
      if (columnIndex >= 0) {
        state.columns[columnIndex]
          ? state.columns[columnIndex].tasks.push(action.payload)
          : (state.columns[columnIndex].tasks = [action.payload]);
      }
    });
    builder.addCase(editTask.fulfilled, (state, action: PayloadAction<TaskState>) => {
      const columnIndex = state.columns.findIndex(
        (column) => column.id === action.payload.columnId
      );
      if (columnIndex >= 0) {
        const taskIndex = state.columns[columnIndex].tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (taskIndex >= 0) {
          state.columns[columnIndex].tasks[taskIndex] = action.payload;
        }
      }
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      const columnIndex = state.columns.findIndex(
        (column) => column.id === action.payload?.columnId
      );
      if (columnIndex) {
        state.columns[columnIndex].tasks = state.columns[columnIndex].tasks.filter(
          (task) => task.id !== action.payload?.taskId
        );
      }
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
