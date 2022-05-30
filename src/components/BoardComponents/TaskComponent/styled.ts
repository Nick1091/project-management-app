import styled from 'styled-components';
import { IconButton } from '@mui/material';
import { styled as styles } from '@mui/material/styles';

export const Task = styled.li`
  position: relative;
  background-color: #ffffff;
  width: 100%;
  flex-shrink: 0;
  border-radius: 4px;
  padding: 10px;
  margin: 5px 0px;
  cursor: pointer;
  transition: 0.1s;
  box-shadow: 2px 2px 6px 1px #091e4240;
  white-space: normal;
  overflow: hidden;
  &:hover {
    background-color: #ffffff80;
  }
  ${(props: { isOver: boolean; isDraggingTask: boolean }) => {
    if (props.isOver || props.isDraggingTask) {
      return {
        backgroundColor: '#091e420a',
        boxShadow: '0px 0px 20px 0px #091e4240',
        color: 'transparent',
      };
    }
  }}
`;

export const DeleteBtn = styles(IconButton)`
  position: absolute;
  right: 4px;
  top: 4px;
`;

export const TaskButton = styled.div`
  max-width: 246px;
  height: 100%;
`;
