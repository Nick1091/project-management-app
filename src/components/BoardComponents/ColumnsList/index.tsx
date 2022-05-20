import React, { useState, useEffect, DragEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { ColumnInputs, ModalInputState, ColumnState } from '../../../types';
import { createBoardColumn, updateBoardColumn } from '../../../requests';
import { columnFormSchema } from '../../../validation';
import { getBiggestListOrder, updateGrabbedColumn } from '../../../utils';
import { useForm } from 'react-hook-form';
import { ModalWithForm } from '../ModalWithForm';
import { ColumnItem } from '../ColumnItem';
import { ColumnListContainer, CreateColumnBtn, ColumnBtn } from './styled';

type ColumnListProps = {
  token: string | null;
  boardId?: string;
};

export const ColumnList = ({ token, boardId }: ColumnListProps) => {
  const { columns } = useAppSelector((state) => state.boardState);
  const dispatch = useAppDispatch();

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [columnOrder, setColumnOrder] = useState(0);
  const [currentColumn, setCurrentColumn] = useState<ColumnState | undefined>();
  const additionNumNextColumnOrder = 1;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ColumnInputs>({
    resolver: yupResolver(columnFormSchema),
    defaultValues: { title: '' },
  });

  const inputsOptions: ModalInputState<ColumnInputs>[] = [
    {
      textFieldProps: {
        size: 'small',
        id: 'outlined-basic',
        label: 'Column Title',
        variant: 'outlined',
        error: Boolean(errors.title),
        helperText: errors.title?.message,
      },
      name: 'title',
      control,
    },
  ];

  useEffect(() => {
    const topColumnOrder = getBiggestListOrder(columns);
    setColumnOrder(topColumnOrder + additionNumNextColumnOrder);
  }, [columns]);

  const createColumnHandler = ({ title }: ColumnInputs) => {
    if (token && boardId)
      dispatch(createBoardColumn({ token, boardId, columnTitle: title, order: columnOrder }));
    reset();
    setIsModalOpened(false);
  };

  const handleCloseModal = () => {
    setIsModalOpened(false);
    reset();
  };

  const handleDragStartColumn = (e: DragEvent<HTMLLIElement>, columnStart: ColumnState) => {
    setCurrentColumn(columnStart);
  };

  const handleDropColumn = async (e: DragEvent<HTMLLIElement>, columnDrop: ColumnState) => {
    e.preventDefault();
    const drop = columns.find((columnItem) => columnItem.id === columnDrop.id);
    const cur = columns.find((columnItem) => columnItem.id === currentColumn?.id);
    const topOrder = getBiggestListOrder(columns) + additionNumNextColumnOrder;

    if (drop && cur && token && boardId) {
      const dropOrder = drop.order;
      const curOrder = cur.order;

      updateGrabbedColumn(e, 'remove');

      const sortedColumns = [...columns].sort((columnA, columnB) => columnA.order - columnB.order);
      const dropColumnIndex = sortedColumns.findIndex((column) => column.order === dropOrder);

      const columnsToUpdate = sortedColumns
        .splice(dropColumnIndex)
        .filter((column) => column.order !== dropOrder && column.order !== curOrder);

      columnsToUpdate.forEach(async (column, index) => {
        await dispatch(
          updateBoardColumn({
            token,
            boardId,
            column: { ...column, order: topOrder + index + additionNumNextColumnOrder },
          })
        );
      });

      await dispatch(
        updateBoardColumn({
          token,
          boardId,
          column: { ...drop, order: topOrder },
        })
      );
      await dispatch(
        updateBoardColumn({
          token,
          boardId,
          column: { ...cur, order: dropOrder },
        })
      );

      const nextDropColumnOrder = dropOrder + additionNumNextColumnOrder;

      await dispatch(
        updateBoardColumn({
          token,
          boardId,
          column: { ...drop, order: nextDropColumnOrder },
        })
      );

      columnsToUpdate.forEach(async (column, index) => {
        await dispatch(
          updateBoardColumn({
            token,
            boardId,
            column: {
              ...column,
              order: nextDropColumnOrder + index + additionNumNextColumnOrder,
            },
          })
        );
      });
    }
  };

  const handleDragOverColumn = (e: DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    updateGrabbedColumn(e, 'add');
  };

  const handleDragEndColumn = (e: DragEvent<HTMLLIElement>) => {
    updateGrabbedColumn(e, 'remove');
  };

  return (
    <>
      <ColumnListContainer>
        {columns.length > 0 &&
          [...columns]
            .sort((columnA, columnB) => columnA.order - columnB.order)
            .map(
              (column) =>
                boardId && (
                  <ColumnItem
                    handleDragEndColumn={handleDragEndColumn}
                    handleDragOverColumn={handleDragOverColumn}
                    handleDragStartColumn={handleDragStartColumn}
                    handleDropColumn={handleDropColumn}
                    column={column}
                    key={column.id}
                    token={token}
                    boardId={boardId}
                  />
                )
            )}
        <ColumnBtn>
          <CreateColumnBtn onClick={() => setIsModalOpened(true)}>Create Column</CreateColumnBtn>
        </ColumnBtn>
      </ColumnListContainer>

      {isModalOpened && (
        <ModalWithForm<ColumnInputs>
          titleText="Create column"
          inputs={inputsOptions}
          handleSubmit={handleSubmit(createColumnHandler)}
          isModalOpened={isModalOpened}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};
