import React, { useState } from 'react';
import { useAppDispatch } from '../../../hooks';
import { deleteBoardColumn } from '../../../requests';
import { ConfirmModal } from '../../ConfirmModal';
import { DeleteButton } from '../../DeleteButton';
import { ColumnContainer, DeleteButtonContainer } from './styled';

type ColumnItemProps = {
  title: string;
  boardId: string;
  columnId: string;
  token: string | null;
};

export const ColumnItem = ({ title, token, boardId, columnId }: ColumnItemProps) => {
  const [isVisibleRemoveBtn, setIsVisibleRemoveBtn] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const dispatch = useAppDispatch();

  const handleDeleteColumn = () => {
    if (token) dispatch(deleteBoardColumn({ token, boardId, columnId }));
  };
  return (
    <ColumnContainer
      onMouseOver={() => setIsVisibleRemoveBtn(true)}
      onMouseOut={() => setIsVisibleRemoveBtn(false)}
    >
      <span>{title}</span>
      {isVisibleRemoveBtn && (
        <DeleteButtonContainer>
          <DeleteButton handleClick={() => setIsOpenConfirmModal(true)} />
        </DeleteButtonContainer>
      )}
      {isOpenConfirmModal && (
        <ConfirmModal
          isOpen={isOpenConfirmModal}
          closeModal={() => setIsOpenConfirmModal(false)}
          alertText={`Do you really want to delete "${title}" column?`}
          handleSubmit={handleDeleteColumn}
        />
      )}
    </ColumnContainer>
  );
};
