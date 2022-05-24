import React, { useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getBoardById } from '../../requests';
import { removeAllColumns } from '../../store/boardSlice';

const BoardTitle = React.lazy(() =>
  import('../../components/BoardComponents/BoardTitle').then((module) => ({
    default: module.BoardTitle,
  }))
);
const ColumnList = React.lazy(() =>
  import('../../components/BoardComponents/ColumnsList').then((module) => ({
    default: module.ColumnList,
  }))
);

export const Board = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const {
    authUser: { token },
  } = useAppSelector((state) => state.authUser);
  const { error, columns, boardTitle, boardDescription } = useAppSelector(
    (state) => state.boardState
  );

  useEffect(() => {
    if (token && id) dispatch(getBoardById({ token, id }));
    return () => {
      dispatch(removeAllColumns());
    };
  }, [dispatch, token, id]);

  if (error) return <h3>{error}</h3>;

  return (
    <>
      <React.Suspense fallback={<CircularProgress />}>
        <BoardTitle title={boardTitle} description={boardDescription} token={token} id={id} />
        <ColumnList columns={columns} token={token} boardId={id} />
      </React.Suspense>
    </>
  );
};
