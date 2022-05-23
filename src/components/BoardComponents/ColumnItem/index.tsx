import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useAppDispatch } from '../../../hooks';
import { deleteBoardColumn } from '../../../requests';
import { ItemTypes } from '../../../constants';
import { ColumnState } from '../../../types/storeTypes';
import { ConfirmModal } from '../../ConfirmModal';
import { DeleteButton } from '../../DeleteButton';
import { ColumnContainer, DeleteButtonContainer, ColumnListItem } from './styled';

type ColumnItemProps = {
  column: ColumnState;
  boardId: string;
  token: string | null;
  moveColumn: (id: string, atIndex: number, movedId?: string) => void;
  findColumn: (id: string) => { column: ColumnState; index: number } | undefined;
};

export const ColumnItem = ({ moveColumn, findColumn, column, token, boardId }: ColumnItemProps) => {
  const [isVisibleRemoveBtn, setIsVisibleRemoveBtn] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const { title, id } = column;
  const dispatch = useAppDispatch();
  const originalIndex = findColumn(id)?.index;
  const handleDeleteColumn = () => {
    if (token) dispatch(deleteBoardColumn({ token, boardId, columnId: id }));
  };
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.COLUMN,
    item: { id, originalIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (dropResult, monitor) => {
      const { id: droppedId, originalIndex } = monitor.getItem();
      const didDrop = monitor.didDrop();
      if (!didDrop && originalIndex) {
        moveColumn(droppedId, originalIndex);
      }
      const columnData = findColumn(droppedId);
      if (
        didDrop &&
        originalIndex !== undefined &&
        columnData &&
        columnData.index !== originalIndex
      ) {
        moveColumn(droppedId, columnData.index);
      }
    },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.COLUMN,
    canDrop: () => false,
    hover({ id: draggedId }: { id: string; originalIndex: number | undefined }) {
      if (draggedId !== id) {
        const columnData = findColumn(id);
        if (columnData) moveColumn(draggedId, columnData.index, id);
      }
    },
  });

  return (
    <ColumnListItem ref={(node) => drop(node)}>
      <ColumnContainer
        onMouseOver={() =>
          !isDragging ? setIsVisibleRemoveBtn(true) : setIsVisibleRemoveBtn(false)
        }
        onMouseOut={() => setIsVisibleRemoveBtn(false)}
        className="column-container"
        isDragging={isDragging}
        ref={(node) => drag(drop(node))}
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
