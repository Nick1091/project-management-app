import styled from 'styled-components';
import { styled as styles } from '@mui/material/styles';
import { Button } from '@mui/material';
import { columnStyles } from '../styles';

export const ColumnListContainer = styled.ul`
  display: flex;
  gap: 8px;
  align-items: flex-start;
  list-style-type: none;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  height: calc(100vh - 300px); // 64 + 140 + 72 + 24 header + title + footer + footer margin
`;

export const ColumnBtn = styled.li`
  ${columnStyles};
`;

export const CreateColumnBtn = styles(Button)`
  height: 45px;
  width: 100%;
`;
