import styled from 'styled-components';
import { styled as styles } from '@mui/material/styles';
import { Button } from '@mui/material';
import { columnStyles } from '../styles';

export const ColumnTitle = styled.p`
  flex-shrink: 0;
  border-radius: 4px;
  padding: 10px;
  margin: 0px;
`;
export const ColumnTask = styled.li`
  background-color: #091e420a;
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
  margin: 5px;
  &:hover {
    background-color: #091e4222;
  }
`;

export const ContainerTask = styled.ul`
  display: flex;
  flex-direction: column;
  margin-right: 5px;
  padding: 10px;
  overflow-x: hidden;
  max-height: calc(100vh - 390px);
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

export const ColumnListItem = styled.li`
  height: 100%;
  position: relative;
`;

export const ColumnContainer = styled.div`
  ${columnStyles};
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 45px;
  position: relative;

  ${(props: { isDragging: boolean }) => {
    if (props.isDragging) {
      return { backgroundColor: '#091e42d6', color: 'transparent' };
    }
  }}
`;

export const DeleteButtonContainer = styled.div`
  position: absolute;
  right: 4px;
  top: 4px;
`;
