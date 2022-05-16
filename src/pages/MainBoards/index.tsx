import React from 'react';
import { BoardsList } from '../../components/MainBoardsComponents/BoardsList';
import { BoardsContainer } from './styled';

export const MainBoards = () => {
  return (
    <BoardsContainer>
      <BoardsList />
    </BoardsContainer>
  );
};
