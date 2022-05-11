import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getBoards } from '../../../requests';
import { CircularProgress } from '@mui/material';
import { BoardItem } from '../BoardItem';

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
      {boards.map((board) => (
        <BoardItem title={board.title} id={board.id} key={board.id} />
      ))}
    </>
  );
};
