import React, { useState, DragEvent } from 'react';
import { useAppDispatch } from '../../../hooks';
import { deleteBoardColumn } from '../../../requests';
import { ColumnState } from '../../../types/storeTypes';
import { ConfirmModal } from '../../ConfirmModal';
import { DeleteButton } from '../../DeleteButton';
import { ColumnContainer, DeleteButtonContainer, ColumnListItem } from './styled';

type ColumnItemProps = {
  column: ColumnState;
  boardId: string;
  token: string | null;
  handleDragStartColumn: (e: DragEvent<HTMLLIElement>, column: ColumnState) => void;
  handleDropColumn: (e: DragEvent<HTMLLIElement>, column: ColumnState) => void;
  handleDragOverColumn: (e: DragEvent<HTMLLIElement>) => void;
  handleDragEndColumn: (e: DragEvent<HTMLLIElement>) => void;
};

export const ColumnItem = ({
  handleDragStartColumn,
  handleDropColumn,
  handleDragOverColumn,
  handleDragEndColumn,
  column,
  token,
  boardId,
}: ColumnItemProps) => {
  const [isVisibleRemoveBtn, setIsVisibleRemoveBtn] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const { title, id } = column;
  const dispatch = useAppDispatch();

  const handleDeleteColumn = () => {
    if (token) dispatch(deleteBoardColumn({ token, boardId, columnId: id }));
  };

  return (
    <ColumnListItem
      onDragStart={(e) => handleDragStartColumn(e, column)}
      onDragOver={handleDragOverColumn}
      onDrop={(e) => handleDropColumn(e, column)}
      onDragLeave={handleDragEndColumn}
      onDragEnd={handleDragEndColumn}
    >
      <ColumnContainer
        onMouseOver={() => setIsVisibleRemoveBtn(true)}
        onMouseOut={() => setIsVisibleRemoveBtn(false)}
        className="column-container"
        draggable
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
    </ColumnListItem>
  );
};
