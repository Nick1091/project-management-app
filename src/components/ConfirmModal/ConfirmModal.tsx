import React from 'react';
import { Modal, Button } from '@mui/material';
import { modalStyles, ModalOverlay } from './ConfirmModalStyles';

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
            Ok
          </Button>
          <Button onClick={closeModal}>Cancel</Button>
        </div>
      </ModalOverlay>
    </Modal>
  );
};
