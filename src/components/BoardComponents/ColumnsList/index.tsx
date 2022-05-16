import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { ColumnInputs, ModalInputState } from '../../../types/boardTypes';
import { createBoardColumn } from '../../../requests';
import { columnFormSchema } from '../../../validation';
import { useForm } from 'react-hook-form';
import { Column, ColumnContainer, CreateColumnBtn } from './styled';
import { ModalWithForm } from '../ModalWithForm';

type ColumnListProps = {
  token: string | null;
  id?: string;
};

export const ColumnList = ({ token, id }: ColumnListProps) => {
  const { columns } = useAppSelector((state) => state.boardState);
  const dispatch = useAppDispatch();

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [columnOrder, setColumnOrder] = useState(0);
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
    const topColumnOrder = columns.reduce(
      (biggestOrder, column) => (biggestOrder > column.order ? biggestOrder : column.order),
      0
    );
    setColumnOrder(topColumnOrder + additionNumNextColumnOrder);
  }, [columns]);

  const createColumnHandler = ({ title }: ColumnInputs) => {
    if (token && id)
      dispatch(createBoardColumn({ token, boardId: id, columnTitle: title, order: columnOrder }));
    setColumnOrder((prevNumber) => (prevNumber = prevNumber + additionNumNextColumnOrder));
    reset();
    setIsModalOpened(false);
  };

  const handleCloseModal = () => {
    setIsModalOpened(false);
    reset();
  };

  return (
    <>
      <ColumnContainer>
        {columns.length > 0 &&
          [...columns]
            .sort((columnA, columnB) => columnA.order - columnB.order)
            .map((column) => <Column key={column.id}>{column.title}</Column>)}
        <Column>
          <CreateColumnBtn onClick={() => setIsModalOpened(true)}>Create Column</CreateColumnBtn>
        </Column>
      </ColumnContainer>

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
