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
  editBoardColumn,
} from '../requests';

const initialState: BoardState = {
  isCreatingColumn: false,
  isCreatingTask: false,
  isDeletingColumn: false,
  isDeletingTask: false,
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
    removeError: (state) => {
      state.error = null;
    },
    setDeletingColumnId: (state, action) => {
      state.deletingColumnId = action.payload;
    },
    setDeletingTaskId: (state, action) => {
      state.deletingTaskId = action.payload;
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
    builder.addCase(getBoardById.rejected, (state, action) => {
      state.error = action.payload as string;
      state.isLoading = false;
    });
    builder.addCase(editBoard.fulfilled, (state, action) => {
      state.boardTitle = action.payload;
    });
    builder.addCase(editBoard.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(createBoardColumn.fulfilled, (state, action) => {
      if (!state.columns) state.columns = [];
      state.columns.push(action.payload);
      state.isCreatingColumn = false;
    });
    builder.addCase(createBoardColumn.pending, (state) => {
      state.isCreatingColumn = true;
    });
    builder.addCase(createBoardColumn.rejected, (state, action) => {
      state.error = action.payload as string;
      state.isCreatingColumn = false;
    });
    builder.addCase(createTask.pending, (state) => {
      state.isCreatingTask = true;
    });
    builder.addCase(createTask.rejected, (state, action) => {
      state.error = action.payload as string;
      state.isCreatingTask = false;
    });
    builder.addCase(createTask.fulfilled, (state, action: PayloadAction<TaskState>) => {
      if (state.columns) {
        const columnIndex = state.columns.findIndex(
          (column) => column.id === action.payload.columnId
        );
        if (columnIndex !== -1) {
          state.columns[columnIndex].tasks
            ? state.columns[columnIndex].tasks.push(action.payload)
            : (state.columns[columnIndex].tasks = [action.payload]);
        }
      }
      state.isCreatingTask = false;
    });
    builder.addCase(editTask.fulfilled, (state, action: PayloadAction<TaskState>) => {
      if (state.columns) {
        const columnIndex = state.columns.findIndex(
          (column) => column.id === action.payload.columnId
        );
        if (columnIndex !== -1) {
          const taskIndex = state.columns[columnIndex].tasks.findIndex(
            (task) => task.id === action.payload.id
          );
          if (taskIndex !== -1) {
            state.columns[columnIndex].tasks[taskIndex] = action.payload;
          }
        }
      }
    });
    builder.addCase(editTask.rejected, (state, action) => {
      state.error = (action.payload as string) + 'task';
    });
    builder.addCase(deleteTask.pending, (state) => {
      state.isDeletingTask = true;
    });
    builder.addCase(editBoardColumn.rejected, (state, action) => {
      state.error = (action.payload as string) + 'column';
    });
    builder.addCase(
      editBoardColumn.fulfilled,
      (
        state,
        action: PayloadAction<{ boardId: string; id: string; title: string; order: number }>
      ) => {
        if (state.columns) {
          const indexOfColumn = state.columns.findIndex(
            (column) => column.id === action.payload.id
          );
          if (indexOfColumn !== -1) {
            state.columns[indexOfColumn].title = action.payload.title;
          }
        }
      }
    );
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.error = (action.payload as string) + 'task';
      state.isDeletingTask = false;
      state.deletingTaskId = undefined;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      if (state.columns) {
        const columnIndex = state.columns.findIndex(
          (column) => column.id === action.payload?.columnId
        );
        if (columnIndex !== -1) {
          state.columns[columnIndex].tasks = state.columns[columnIndex].tasks.filter(
            (task) => task.id !== action.payload?.taskId
          );
        }
      }
      state.isDeletingTask = false;
      state.deletingTaskId = undefined;
    });
    builder.addCase(deleteBoardColumn.pending, (state) => {
      state.isDeletingColumn = true;
    });
    builder.addCase(deleteBoardColumn.fulfilled, (state, action) => {
      if (state.columns) {
        state.columns = state.columns.filter((column) => column.id !== action.payload);
      }
      state.isDeletingColumn = false;
      state.deletingColumnId = undefined;
    });
    builder.addCase(deleteBoardColumn.rejected, (state, action) => {
      state.error = (action.payload as string) + 'column';
      state.isDeletingColumn = false;
      state.deletingColumnId = undefined;
    });
    builder.addCase(getBoardColumns.fulfilled, (state, action) => {
      state.columns = action.payload.columns;
    });
    builder.addCase(getBoardColumns.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const { removeAllColumns, removeError, setDeletingColumnId, setDeletingTaskId } =
  boardSlice.actions;

export default boardSlice.reducer;
