import { Control, FieldError } from 'react-hook-form';
import { ModalInputState, TaskInput } from '../../../types';

type TypeError = {
  title?: FieldError | undefined;
  description?: FieldError | undefined;
};

export const getInputs = (errors: TypeError, control: Control<TaskInput>) => {
  const inputsOptions: ModalInputState<TaskInput>[] = [
    {
      textFieldProps: {
        size: 'small',
        id: 'outlined-basic',
        variant: 'outlined',
        error: Boolean(errors.title),
        helperText: errors.title?.message,
      },
      label: 'Task title',
      name: 'title',
      control,
    },
    {
      textFieldProps: {
        rows: '4',
        multiline: true,
        size: 'small',
        id: 'outlined-basic',
        variant: 'outlined',
        error: Boolean(errors.description),
        helperText: errors.description?.message,
      },
      label: 'Task description',
      name: 'description',
      control,
    },
  ];
  return inputsOptions;
};
