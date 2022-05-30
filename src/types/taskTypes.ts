import { ColumnState, TaskState } from './storeTypes';

export type TaskInput = {
  title: string;
  description: string;
};

export type PropsTask = {
  moveTask: (
    taskId: string,
    columnId: string,
    originalColumnIndex: number,
    originalTaskIndex: number,
    columnCurrentId: string,
    taskCurrentId?: string
  ) => void;
  findTask: (
    columnID: string,
    taskId: string
  ) => { column: ColumnState; columnIndex: number; taskIndex: number } | undefined;
} & TaskState;

export type TaskSearch = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  user: {
    name: string;
  };
};
