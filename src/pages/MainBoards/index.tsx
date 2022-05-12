import React from 'react';
import { Container } from '@mui/material';
import { NewBoard } from '../../components/MainBoardsComponents/NewBoard';
import { BoardsList } from '../../components/MainBoardsComponents/BoardsList';
import { BoardsContainer } from './styled';

export const MainBoards = () => {
  return (
    <Container>
      <BoardsContainer>
        <NewBoard />
        <BoardsList />
      </BoardsContainer>
    </Container>
  );
};
