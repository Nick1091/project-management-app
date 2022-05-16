import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getBoardById } from '../../requests';
import { removeAllColumns } from '../../store/boardSlice';
import { BoardTitle } from '../../components/BoardComponents/BoardTitle';
import { CircularProgress } from '@mui/material';
import { ColumnList } from '../../components/BoardComponents/ColumnsList';

export const Board = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const {
    authUser: { token },
  } = useAppSelector((state) => state.authUser);
  const { isLoading, error } = useAppSelector((state) => state.boardState);

  useEffect(() => {
    if (token && id) dispatch(getBoardById({ token, id }));
    return () => {
      dispatch(removeAllColumns());
    };
  }, [dispatch, token, id]);

  if (isLoading) return <CircularProgress />;
  if (error) return <h3>{error}</h3>;

  return (
    <>
      <BoardTitle token={token} id={id} />
      <ColumnList token={token} boardId={id} />
    </>
  );
};
