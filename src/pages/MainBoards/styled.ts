import styled from 'styled-components';

export const BoardsContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 25%);
  flex-wrap: wrap;
  list-style-type: none;
  justify-content: flex-start;
  padding: 20px 0 20px 0;
  margin: 0;
`;
