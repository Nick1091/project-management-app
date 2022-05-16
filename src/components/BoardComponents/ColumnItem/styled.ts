import styled from 'styled-components';
import { columnStyles } from '../styles/columnStyles';

export const ColumnContainer = styled.li`
  ${columnStyles};
  padding: 8px 32px 8px 8px;
  min-height: 45px;
  position: relative;
`;

export const DeleteButtonContainer = styled.div`
  position: absolute;
  right: 4px;
  top: 4px;
`;
