import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import styled from 'styled-components';
import { styled as styles } from '@mui/material/styles';
import { createBoardColumn, getBoardById } from '../../requests';
import { Button, CircularProgress, TextField } from '@mui/material';
import { BoardTitle } from '../../components/BoardComponents/BoardTitle';
import { Modal } from '../../components/Modal';
import { yupResolver } from '@hookform/resolvers/yup';
import { BoardInputs } from '../../types/boardTypes';
import { boardFormSchema } from '../../validation';
import { useForm } from 'react-hook-form';
import { removeAllColumns } from '../../store/boardSlice';

const ColumnContainer = styled.ul`
  display: flex;
  gap: 8px;
  align-items: flex-start;
  list-style-type: none;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  height: calc(100vh - 159px); // header + title
`;

const Column = styled.li`
  width: 272px;
  background-color: #091e420a;
  flex-shrink: 0;
  border-radius: 4px;
`;

const CreateColumnBtn = styles(Button)`
  width: 100%;
`;

const ColumnForm = styled.form`
  display: flex;
  flex-direction: column;
  color: #fff;
  gap: 8px;
`;

export const Board = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const {
    authUser: { token },
  } = useAppSelector((state) => state.authUser);
  const { boardTitle, columns, isLoading, error } = useAppSelector((state) => state.boardState);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [counter, setCounter] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BoardInputs>({ resolver: yupResolver(boardFormSchema) });

  useEffect(() => {
    if (token && id) dispatch(getBoardById({ token, id }));
  }, [dispatch, token, id]);

  useEffect(() => {
    setCounter(
      columns.reduce(
        (biggerOrder, column) => (biggerOrder > column.order ? biggerOrder : column.order),
        0
      ) + 1
    );
  }, [columns]);

  useEffect(() => {
    return () => {
      dispatch(removeAllColumns());
    };
  }, []);

  const createColumnHandler = ({ title }: BoardInputs) => {
    if (token && id)
      dispatch(createBoardColumn({ token, boardId: id, columnTitle: title, order: counter }));
    setCounter((prevNumber) => (prevNumber = prevNumber + 1));
    reset();
    setIsModalOpened(false);
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <h3>{error}</h3>;

  return (
    <>
      <BoardTitle boardTitle={boardTitle} token={token} id={id} />
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
        <Modal isOpen={isModalOpened} closeModal={() => setIsModalOpened(false)}>
          <ColumnForm onSubmit={handleSubmit(createColumnHandler)}>
            <TextField
              id="outlined-basic"
              label="Column Title"
              variant="outlined"
              error={Boolean(errors.title)}
              helperText={errors.title?.message}
              {...register('title')}
            />
            <Button type="submit" variant="outlined" disabled={Boolean(errors.title)}>
              Create
            </Button>
          </ColumnForm>
        </Modal>
      )}
    </>
  );
};
