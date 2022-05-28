import styled from 'styled-components';
import { styled as styles } from '@mui/material/styles';
import { Button } from '@mui/material';
import { columnStyles } from '../styles';

export const ColumnListContainer = styled.ul`
  display: flex;
  gap: 8px;
  align-items: flex-start;
  list-style-type: none;
  overflow-x: auto;
  margin: 0;
  padding: 0;
  height: calc(100vh - 300px); // 64 + 140 + 72 + 24 header + title + footer + footer margin
`;

export const Column = styled.li`
  width: 272px;
  background-color: #ebecf0;
  flex-shrink: 0;
  border-radius: 4px;
`;

export const ColumnBtn = styled.li`
  ${columnStyles};
`;

export const CreateColumnBtn = styles(Button)`
  height: 45px;
  width: 100%;
`;
export const ColumnContainer = styled.div`
  width: 292px;
  display: flex;
  flex-direction: column;
  background-color: #ebecf0;
`;

export const ColumnForm = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  color: #fff;
  gap: 8px;
`;
