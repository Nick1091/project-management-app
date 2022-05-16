import { useId } from 'react';
import { Controller } from 'react-hook-form';
import { ModalInputState } from '../../../types/boardTypes';
import { Modal } from '../../../components/Modal';
import { Button, TextField, Typography } from '@mui/material';
import { ColumnForm } from './styled';

type ModalWithFormProps<T> = {
  isModalOpened: boolean;
  titleText: string;
  handleCloseModal: () => void;
  handleSubmit: () => void;
  inputs: ModalInputState<T>[];
};

export const ModalWithForm = <T,>({
  isModalOpened,
  handleCloseModal,
  titleText,
  handleSubmit,
  inputs,
}: ModalWithFormProps<T>) => {
  const idPrefix = useId();

  return (
    <Modal isOpen={isModalOpened} closeModal={handleCloseModal}>
      <Typography align="center" variant="h5" sx={{ color: '#000', paddingBottom: '8px' }}>
        {titleText}
      </Typography>
      <ColumnForm onSubmit={handleSubmit}>
        {inputs.length > 0 &&
          inputs.map((inputState) => (
            <Controller
              key={idPrefix + inputState.name}
              render={({ field: { value, onChange } }) => (
                <TextField {...inputState.textFieldProps} value={value} onChange={onChange} />
              )}
              name={inputState.name}
              control={inputState.control}
            />
          ))}
        <div>
          <Button type="button" color="error" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button type="submit" variant="outlined">
            Create
          </Button>
        </div>
      </ColumnForm>
    </Modal>
  );
};
