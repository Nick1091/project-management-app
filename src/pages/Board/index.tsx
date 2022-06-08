import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getBoardById } from '../../requests';
import { removeAllColumns } from '../../store/boardSlice';
import { BoardTitle } from '../../components/BoardComponents/BoardTitle';
import { ColumnsList } from '../../components/BoardComponents/ColumnsList';
import { Preloader } from '../../components/Preloader';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const Board = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const {
    authUser: { token },
  } = useAppSelector((state) => state.authUser);
  const { error, columns, boardTitle, boardDescription, isLoading } = useAppSelector(
    (state) => state.boardState
  );
  const { t } = useTranslation(['appErrors']);

  useEffect(() => {
    if (token && id) dispatch(getBoardById({ token, id }));
    return () => {
      dispatch(removeAllColumns());
    };
  }, [dispatch, token, id]);

  if (error === '400') {
    return (
      <Typography sx={{ fontSize: '28px', fontWeight: '500', paddingTop: '16px' }}>
        {t(error)}
      </Typography>
    );
  }

  return columns && boardTitle && boardDescription && !isLoading ? (
    <>
      <BoardTitle title={boardTitle} description={boardDescription} token={token} id={id} />
      <ColumnsList columns={columns} token={token} boardId={id} />
    </>
  ) : (
    <Preloader
      sxContainer={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
};
