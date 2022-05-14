import styled from 'styled-components';
import { styled as styles } from '@mui/material/styles';
import { Button } from '@mui/material';

export const ColumnContainer = styled.ul`
  display: flex;
  gap: 8px;
  align-items: flex-start;
  list-style-type: none;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  height: calc(100vh - 159px); // header + title
`;

export const Column = styled.li`
  width: 272px;
  background-color: #091e420a;
  flex-shrink: 0;
  border-radius: 4px;
`;

export const CreateColumnBtn = styles(Button)`
width: 100%;
`;

export const ColumnForm = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  color: #fff;
  gap: 8px;
`;
