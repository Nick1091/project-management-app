import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTasks } from '../requests';
import { TaskSearch } from '../types';

export type TasksListState = {
  tasks: Array<TaskSearch>;
  error: string | null;
  isLoading: boolean;
  searchValue: string;
};

const initialState: TasksListState = {
  tasks: [],
  error: null,
  isLoading: false,
  searchValue: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    saveSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    removeError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTasks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTasks.fulfilled, (state, action: PayloadAction<TasksListState['tasks']>) => {
      state.tasks = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getTasks.rejected, (state, action) => {
      state.error = action.payload as string;
      state.isLoading = false;
    });
  },
});

export const { saveSearchValue, removeError } = searchSlice.actions;

export default searchSlice.reducer;
