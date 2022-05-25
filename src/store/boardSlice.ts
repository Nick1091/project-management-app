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
      const column = state.columns.find((column) => column.id === action.payload.columnId);
      if (column) {
        column.tasks ? column.tasks.push(action.payload) : (column.tasks = [action.payload]);
        state.columns = [
          ...state.columns.filter((column) => column.id !== action.payload.columnId),
          column,
        ];
      }
    });
    builder.addCase(editTask.fulfilled, (state, action: PayloadAction<TaskState>) => {
      const columnTarget = state.columns.find((column) => column.id === action.payload.columnId);
      if (columnTarget) {
        const tasks = columnTarget.tasks.filter((task) => task.id !== action.payload.id);
        tasks.push(action.payload);
        state.columns = [
          ...state.columns.filter((column) => column.id !== action.payload.columnId),
          { ...columnTarget, tasks },
        ];
      }
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      const columnTarget = state.columns.find((column) => column.id === action.payload?.columnId);
      if (columnTarget) {
        const tasks = columnTarget.tasks.filter((task) => task.id !== action.payload?.taskId);
        state.columns = [
          ...state.columns.filter((column) => column.id !== action.payload?.columnId),
          { ...columnTarget, tasks },
        ];
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
