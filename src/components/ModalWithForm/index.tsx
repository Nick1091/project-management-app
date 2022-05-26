import { useId } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ModalInputState } from '../../types/boardTypes';
import { Button, TextField, Typography } from '@mui/material';
import { Modal } from '../Modal';
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
  const { t } = useTranslation(['common', 'task']);
  const firstWord = 0;
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
                <TextField
                  {...inputState.textFieldProps}
                  value={value}
                  label={t(inputState.label, { ns: 'task' })}
                  onChange={onChange}
                />
              )}
              name={inputState.name}
              control={inputState.control}
            />
          ))}
        <div>
          <Button type="button" color="error" onClick={handleCloseModal}>
            {t('Cancel')}
          </Button>
          <Button type="submit" variant="outlined">
            {titleText.split(' ')[firstWord]}
          </Button>
        </div>
      </ColumnForm>
    </Modal>
  );
};
