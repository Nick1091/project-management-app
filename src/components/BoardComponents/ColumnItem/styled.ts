import styled from 'styled-components';
import { columnStyles } from '../styles/columnStyles';

export const ColumnListItem = styled.li`
  height: 100%;
`;

export const ColumnContainer = styled.div`
  ${columnStyles};
  padding: 8px 32px 8px 8px;
  min-height: 45px;
  position: relative;
  cursor: grab;

  &.active {
    background-color: lightgray;
  }
`;

export const DeleteButtonContainer = styled.div`
  position: absolute;
  right: 4px;
  top: 4px;
`;
