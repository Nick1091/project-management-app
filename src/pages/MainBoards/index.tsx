import React from 'react';
import { NewBoard } from '../../components/MainBoardsComponents/NewBoard';
import { BoardsList } from '../../components/MainBoardsComponents/BoardsList';
import { BoardsContainer } from './styled';

export const MainBoards = () => {
  return (
    <BoardsContainer>
      <NewBoard />
      <BoardsList />
    </BoardsContainer>
  );
};
