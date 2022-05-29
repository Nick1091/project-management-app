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
  overflow-y: hidden;
  margin: 0;
  padding: 0;
  height: calc(100vh - 300px); // 64 + 140 + 72 + 24 header + title + footer + footer margin

  scrollbar-color: ${(props) => props.theme.palette.grey['100']}
    ${(props) => props.theme.palette.grey['400']};
  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.palette.grey['100']};
    margin: 10px 0px;
    border-radius: 6px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background-color: ${(props) => props.theme.palette.grey['400']};
  }
`;

export const ColumnBtn = styled.li`
  ${columnStyles};
`;

export const CreateColumnBtn = styles(Button)`
  height: 45px;
  width: 100%;
`;

export const ColumnForm = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  color: #fff;
  gap: 8px;
`;
