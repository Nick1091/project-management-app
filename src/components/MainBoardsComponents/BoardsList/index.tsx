import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getBoards } from '../../../requests';
import { CircularProgress } from '@mui/material';
import { BoardItem } from '../BoardItem';
import { NewBoard } from '../NewBoard';

export const BoardsList = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, boards } = useAppSelector((state) => state.mainBoards);
  const {
    authUser: { token },
  } = useAppSelector((state) => state.authUser);

  useEffect(() => {
    if (token) dispatch(getBoards(token));
  }, [dispatch, token]);

  if (isLoading) return <CircularProgress />;
  if (error) return <h3>{error}</h3>;

  return (
    <>
      <NewBoard />
      {boards.map((board) => (
        <BoardItem
          title={board.title}
          description={board.description}
          id={board.id}
          key={board.id}
        />
      ))}
    </>
  );
};
