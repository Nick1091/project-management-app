import { Control, FieldError } from 'react-hook-form';
import { ModalInputState, TaskInputs } from '../../types';

type TypeError = {
  title?: FieldError | undefined;
  description?: FieldError | undefined;
};

export const getInputs = (errors: TypeError, control: Control<TaskInputs>) => {
  const inputsOptions: ModalInputState<TaskInputs>[] = [
    {
      textFieldProps: {
        size: 'small',
        id: 'outlined-basic',
        label: 'Task title',
        variant: 'outlined',
        error: Boolean(errors.title),
        helperText: errors.title?.message,
      },
      name: 'title',
      control,
    },
    {
      textFieldProps: {
        rows: '4',
        multiline: true,
        size: 'small',
        id: 'outlined-basic',
        label: 'Task description',
        variant: 'outlined',
        error: Boolean(errors.description),
        helperText: errors.description?.message,
      },
      name: 'description',
      control,
    },
  ];
  return inputsOptions;
};
