import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';
import { TextField, Box } from '@mui/material';
import { ModalInputState } from '../../types/boardTypes';
import { Modal } from '../Modal';
import { ModalTitle } from '../ModalTitle';
import { ModalBtn } from '../ModalCancelBtn';
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
      <ModalTitle marginBottom="8px">{titleText}</ModalTitle>
      <ColumnForm onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
          {inputs.length > 0 &&
            inputs.map((inputState) => (
              <Controller
                key={idPrefix + inputState.name}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    {...inputState.textFieldProps}
                    sx={{ width: '100%' }}
                    label={t(inputState.label, { ns: 'task' })}
                    value={value}
                    onChange={onChange}
                  />
                )}
                name={inputState.name}
                control={inputState.control}
              />
            ))}
        </Box>
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end', gap: '8px' }}>
          <ModalBtn
            color="grey.500"
            hoverColor="grey.700"
            variant="outlined"
            width="100px"
            handleClick={handleCloseModal}
          >
            {t('Cancel')}
          </ModalBtn>
          <ModalBtn type="submit" colorBg="secondary" variant="contained" width="100px">
            {titleText.split(' ')[firstWord]}
          </ModalBtn>
        </Box>
      </ColumnForm>
    </Modal>
  );
};
