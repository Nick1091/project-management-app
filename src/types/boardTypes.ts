import { Control, Path } from 'react-hook-form';
import { TextFieldProps } from '@mui/material';
import { ColumnState } from './storeTypes';

export type BoardInputs = {
  title: string;
  description: string;
};

export type ColumnInputs = {
  title: string;
};

export type ModalInputState<T> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  textFieldProps: TextFieldProps;
};
export type ItemTypesType = {
  COLUMN: 'column';
};

export type ColumnItemProps = {
  column: ColumnState;
  boardId: string;
  token: string | null;
  isSortArray: boolean;
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
  moveColumn: (id: string, atIndex: number, movedId?: string) => void;
  findColumn: (id: string) => { column: ColumnState; index: number } | undefined;
};
