import React from 'react';
import { Modal } from '../Modal';
import { ModalTitle } from '../ModalTitle';

type ModalWithTextProps = {
  isOpen: boolean;
  closeModal: () => void;
  alertText: string;
};

export const ModalWithText = ({ isOpen, closeModal, alertText }: ModalWithTextProps) => {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <ModalTitle>{alertText}</ModalTitle>
    </Modal>
  );
};
