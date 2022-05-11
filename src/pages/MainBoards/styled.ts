import styled from 'styled-components';

export const BoardsContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  flex-wrap: wrap;
  list-style-type: none;
  justify-content: flex-start;
  padding: 0;
  gap: 16px;
`;
