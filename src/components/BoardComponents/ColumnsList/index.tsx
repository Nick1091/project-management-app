import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { ColumnInputs, ModalInputStates } from '../../../types/boardTypes';
import { createBoardColumn } from '../../../requests';
import { columnFormSchema } from '../../../validation';
import { useForm } from 'react-hook-form';
import { Column, ColumnContainer, CreateColumnBtn } from './styled';
import { ModalWithForm } from '../ModalWithForm';
import { ColumnOfBoard } from '../../ColumnComponent';
import { useTranslation } from 'react-i18next';

type ColumnListProps = {
  token: string | null;
  id?: string;
};

export const ColumnList = ({ token, id }: ColumnListProps) => {
  const { t } = useTranslation(['common']);
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

  const inputsOptions: ModalInputStates<ColumnInputs>[] = [
    {
      textFieldProps: {
        size: 'small',
        id: 'outlined-basic',
        variant: 'outlined',
        error: Boolean(errors.title),
        helperText: errors.title?.message,
      },
      label: 'Column Title',
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            .map((column) => <ColumnOfBoard key={column.id} column={column} />)}
        <Column>
          <CreateColumnBtn onClick={() => setIsModalOpened(true)}>
            {t('Create column')}
          </CreateColumnBtn>
        </Column>
      </ColumnContainer>

      {isModalOpened && (
        <ModalWithForm<ColumnInputs>
          titleText={t('Create column')}
          inputs={inputsOptions}
          handleSubmit={handleSubmit(createColumnHandler)}
          isModalOpened={isModalOpened}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};
