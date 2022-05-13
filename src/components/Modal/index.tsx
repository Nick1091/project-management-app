import React from 'react';
import { Modal as ModalMUI, Box } from '@mui/material';
import { modalStyles } from './styled';

type ConfirmModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
};

export const Modal = ({ isOpen, closeModal, children }: ConfirmModalProps) => {
  return (
    <ModalMUI open={isOpen} onClose={closeModal}>
      <Box sx={modalStyles}>{children}</Box>
    </ModalMUI>
  );
};
