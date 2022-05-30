import React, { useEffect } from 'react';
import { Skeleton } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getBoards } from '../../../requests';
import { BoardItem } from '../BoardItem';
import { NewBoard } from '../NewBoard';

export const BoardsList = () => {
  const dispatch = useAppDispatch();
  const { isLoading, boards } = useAppSelector((state) => state.mainBoards);
  const {
    authUser: { token },
  } = useAppSelector((state) => state.authUser);

  useEffect(() => {
    if (token) dispatch(getBoards(token));
  }, [dispatch, token]);

  const totalSkeletons = 8;
  const skeletonsOnPage = Array.from(Array(totalSkeletons).keys());

  return (
    <>
      {boards && !isLoading ? (
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
      ) : (
        skeletonsOnPage.map((_, index) => (
          <Skeleton
            animation="wave"
            key={`skeleton board ${index}`}
            sx={{ borderRadius: '4px', margin: '4px' }}
            variant="rectangular"
            height={90}
          />
        ))
      )}
    </>
  );
};
