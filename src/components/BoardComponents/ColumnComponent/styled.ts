import styled from 'styled-components';
import { styled as styles } from '@mui/material/styles';
import { Button } from '@mui/material';
import { HEX_OPACITY, device } from '../../../constants';
import { columnStyles } from '../styles';

export const ColumnTitle = styled.h1`
  margin: 0;
  padding: 0;
  line-height: 1.5;
  margin-right: 28px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  font-weight: 500;
  font-size: 18px;

  @media ${device.laptopL} {
    font-size: 20px;
  }
  @media ${device.desktop} {
    font-size: 24px;
  }
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
  padding-left: 0;
  overflow-x: hidden;
  max-height: calc(100vh - 410px);
  scrollbar-width: 6px;
  scrollbar-color: ${(props) => props.theme.palette.grey['100']}
    ${(props) => props.theme.palette.grey['400']};
  &::-webkit-scrollbar {
    width: 6px;
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

export const ColumnListItem = styled.li`
  height: 100%;
  position: relative;
`;

export const ColumnContainer = styled.div`
  ${columnStyles};
  padding: 8px;
  min-height: 45px;
  position: relative;
  background-color: ${(props) => props.theme.palette.primary.light + HEX_OPACITY['20']};
  cursor: grab;
`;

export const DeleteButtonContainer = styled.div`
  position: absolute;
  right: 4px;
  top: 4px;
`;
