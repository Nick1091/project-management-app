import styled from 'styled-components';
import { styled as styles } from '@mui/material/styles';
import { Button } from '@mui/material';

export const ColumnTitle = styled.li`
  width: 272px;
  background-color: #091e4200;
  flex-shrink: 0;
  border-radius: 4px;
  padding: 10px;
`;
export const ColumnTask = styled.li`
  background-color: #dee2e3;
  width: 272px;
  flex-shrink: 0;
  border-radius: 4px;
  padding: 10px;
  margin: 2px 0px;
  overflow-y: auto;
`;

export const CreateTask = styles(Button)`
  background-color: #091e4200;
  padding-right: 25px;
  margin-right: 5px;
  &:hover {
    background-color: #091e4222;
  }
`;

export const ColumnContainer = styled.div`
  width: 292px;
  display: flex;
  flex-direction: column;
  padding: 10px 5px 10px 10px;
  background-color: #ebecf0;
  overflow-x: hidden;
  height: calc(100vh - 276px);
  scrollbar-width: 6px;
  scrollbar-color: #666666a0 #555555;
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #666666a0;
    margin: 10px 0px;
    border-radius: 6px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 6px;
    border: 3px solid #555555;
  }
`;
