import styled, { css } from 'styled-components';
import AutosizeInput from 'react-input-autosize';
import { styled as styles } from '@mui/material/styles';
import { Button } from '@mui/material';
import { HEX_OPACITY } from '../../../constants';
import { columnStyles } from '../styles';

const titleStyles = css`
  padding: 2px 4px;
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  margin: 0;
  border: 2px solid ${(props) => props.theme.palette.primary.main + HEX_OPACITY['50']};
  border-radius: 4px;
`;

export const ColumnTitle = styled.h1`
  ${titleStyles}
  border-color: transparent;
  margin-right: 28px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  cursor: pointer;
`;

export const ColumnTitleInput = styled(AutosizeInput)`
  width: calc(100% - 42px);
  & input {
    ${titleStyles};
    max-width: 100%;

    &:focus-visible {
      outline: none;
      border-color: ${(props) => props.theme.palette.primary.main};
    }
  }
`;

export const EditColumnForm = styled.form`
  position: relative;
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
  max-height: calc(100vh - 394px);
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

export const StyledSubmitButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  height: 20px;
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: -3px;
  left: -16px;
  z-index: 1;
`;
