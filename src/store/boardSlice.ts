import { BoardState, ColumnState, BoardPreview, TaskState } from './../types/storeTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getBoardById,
  editBoard,
  createBoardColumn,
  createTask,
  editTask,
  deleteTask,
} from '../requests';

const initialState: BoardState = {
  columns: [],
  boardTitle: '',
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
      const column = state.columns.filter((column) => column.id === action.payload.columnId)[0];
      column?.tasks.push(action.payload);
      state.columns = [
        ...state.columns.filter((column) => column.id !== action.payload.columnId),
        column,
      ];
    });
    builder.addCase(editTask.fulfilled, (state, action: PayloadAction<TaskState>) => {
      let columnTarget = state.columns.filter((column) => column.id === action.payload.columnId)[0];
      const tasks = columnTarget.tasks.filter((task) => task.id !== action.payload.id);
      tasks.push(action.payload);
      columnTarget = { ...columnTarget, tasks };
      state.columns = [
        ...state.columns.filter((column) => column.id !== action.payload.columnId),
        columnTarget,
      ];
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      let columnTarget = state.columns.filter(
        (column) => column.id === action.payload?.columnId
      )[0];
      const tasks = columnTarget.tasks.filter((task) => task.id !== action.payload?.taskId);
      columnTarget = { ...columnTarget, tasks };
      state.columns = [
        ...state.columns.filter((column) => column.id !== action.payload?.columnId),
        columnTarget,
      ];
    });
  },
});

export const { removeAllColumns } = boardSlice.actions;

export default boardSlice.reducer;
