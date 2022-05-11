import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBoards } from '../../../store/boardsSlice';
import { token } from '../../../config';
import { State } from '../../../types/types';
import { AppDispatch } from '../../../store/store';
import { CircularProgress } from '@mui/material';
import { BoardItem } from '../BoardItem';

export const BoardsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error, boards } = useSelector((state: State) => state.boardsState);

  useEffect(() => {
    dispatch(getBoards(token));
  }, [dispatch]);

  if (isLoading) return <CircularProgress />;
  if (error) return <h3>{error}</h3>;

  return (
    <>
      {boards.map((board) => (
        <BoardItem title={board.title} id={board.id} key={board.id} />
      ))}
    </>
  );
};
