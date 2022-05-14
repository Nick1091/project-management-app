import React from 'react';
import { Modal as ModalMUI, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Close, modalStyles } from './styled';

type ConfirmModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
};

export const Modal = ({ isOpen, closeModal, children }: ConfirmModalProps) => {
  return (
    <ModalMUI open={isOpen} onClose={closeModal}>
      <Box sx={modalStyles}>
        <Close onClick={closeModal}>
          <CloseIcon />
        </Close>
        {children}
      </Box>
    </ModalMUI>
  );
};
