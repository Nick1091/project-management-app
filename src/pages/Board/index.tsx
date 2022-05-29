import React, { useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getBoardById } from '../../requests';
import { removeAllColumns } from '../../store/boardSlice';
import { BoardTitle } from '../../components/BoardComponents/BoardTitle';
import { ColumnsList } from '../../components/BoardComponents/ColumnsList';

export const Board = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const {
    authUser: { token },
  } = useAppSelector((state) => state.authUser);
  const { error, columns, boardTitle, boardDescription, isLoading } = useAppSelector(
    (state) => state.boardState
  );

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
      <BoardTitle title={boardTitle} description={boardDescription} token={token} id={id} />
      <ColumnsList columns={columns} token={token} boardId={id} />
    </>
  );
};
