import { Control, FieldError } from 'react-hook-form';
import { BoardInputs, ModalInputState } from '../../types';

type TypeError = {
  title?: FieldError | undefined;
  description?: FieldError | undefined;
};

export const getBoardInputs = (errors: TypeError, control: Control<BoardInputs>) => {
  const inputsOptions: ModalInputState<BoardInputs>[] = [
    {
      textFieldProps: {
        size: 'small',
        id: 'outlined-basic',
        variant: 'outlined',
        error: Boolean(errors.title),
        helperText: errors.title?.message,
      },
      label: 'Board title',
      name: 'title',
      control,
    },
    {
      textFieldProps: {
        size: 'small',
        id: 'outlined-basic',
        variant: 'outlined',
        error: Boolean(errors.description),
        helperText: errors.description?.message,
      },
      label: 'Board description',
      name: 'description',
      control,
    },
  ];
  return inputsOptions;
};
