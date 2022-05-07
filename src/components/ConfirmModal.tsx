import React from 'react';
import { Alert, Modal, Button } from '@mui/material';
import { styled } from '@mui/system';

const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  boxShadow: 24,
  bgcolor: 'rgb(25, 18, 7)',
  color: '#fff',
  fontSize: '18px',
  borderRadius: '4px',
  p: '24px',
};

const ModalOverlay = styled(Alert)`
  & .MuiAlert-message {
    display: flex;
    flex-direction: column;
  }
`;

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
    <Modal open={isOpen} onClose={() => closeModal()}>
      <ModalOverlay severity="warning" sx={style}>
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
          <Button onClick={() => closeModal()}>Cancel</Button>
        </div>
      </ModalOverlay>
    </Modal>
  );
};
