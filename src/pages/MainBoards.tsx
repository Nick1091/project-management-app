import React, { Suspense } from 'react';
import { CircularProgress, Container } from '@mui/material';

const BoardsList = React.lazy(() =>
  import('../components/BoardsList').then(({ BoardsList }) => ({ default: BoardsList }))
);

export const MainBoards = () => {
  return (
    <Container>
      <Suspense fallback={<CircularProgress />}>
        <BoardsList />
      </Suspense>
    </Container>
  );
};
