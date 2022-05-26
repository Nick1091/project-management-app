import React from 'react';
import { Modal, Button } from '@mui/material';
import { modalStyles, ModalOverlay } from './styled';
import { useTranslation } from 'react-i18next';

type ConfirmModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  alertText: string;
  handleSubmit: () => void;
};

export const ConfirmModal = ({
  isOpen,
  closeModal,
  alertText,
  handleSubmit,
}: ConfirmModalProps) => {
  const { t } = useTranslation(['common']);
  return (
    <Modal open={isOpen} onClose={closeModal}>
      <ModalOverlay severity="warning" sx={modalStyles}>
        <span>{alertText}</span>
        <div>
          <Button
            onClick={() => {
              handleSubmit();
              closeModal();
            }}
          >
            {t('Ok')}
          </Button>
          <Button onClick={closeModal}>{t('Cancel')}</Button>
        </div>
      </ModalOverlay>
    </Modal>
  );
};
