import { useId } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ModalInputStates } from '../../../types/boardTypes';
import { Modal } from '../../../components/Modal';
import { Button, TextField, Typography } from '@mui/material';
import { ColumnForm } from './styled';

type ModalWithFormProps<T> = {
  isModalOpened: boolean;
  titleText: string;
  handleCloseModal: () => void;
  handleSubmit: () => void;
  inputs: ModalInputStates<T>[];
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
                  label={t(inputState.label, { ns: 'task' })}
                  value={value}
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
            {titleText.split(' ')[0]}
          </Button>
        </div>
      </ColumnForm>
    </Modal>
  );
};
