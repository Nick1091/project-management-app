import React from 'react';
import { Container } from '@mui/material';
import { NewBoard } from '../components/NewBoard';
import { BoardsList } from '../components/BoardsList';
import styled from 'styled-components';

const BoardsContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  flex-wrap: wrap;
  list-style-type: none;
  justify-content: flex-start;
  padding: 0;
  gap: 16px;
`;

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
