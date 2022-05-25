import { Control, Path } from 'react-hook-form';
import { TextFieldProps } from '@mui/material';

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
  textFieldProps: TextFieldProps;
};
export type ModalInputStates<T> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  textFieldProps: TextFieldProps;
};
export type ItemTypesType = {
  COLUMN: 'column';
};
