import React from 'react';
import { Box } from '@mui/material';
import { Modal } from '../Modal';
import { ModalTitle } from '../ModalTitle';
import { ModalBtn } from '../ModalCancelBtn';

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
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <ModalTitle>{alertText}</ModalTitle>
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end', gap: '8px' }}>
        <ModalBtn
          color="grey.500"
          hoverColor="grey.700"
          variant="outlined"
          width="100px"
          handleClick={closeModal}
        >
          Cancel
        </ModalBtn>
        <ModalBtn
          colorBg="secondary"
          variant="contained"
          width="100px"
          handleClick={() => {
            handleSubmit();
            closeModal();
          }}
        >
          Ok
        </ModalBtn>
      </Box>
    </Modal>
  );
};
