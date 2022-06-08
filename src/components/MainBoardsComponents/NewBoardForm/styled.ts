import { styled as styles } from '@mui/material/styles';
import styled from 'styled-components';
import { TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const NewBoardFormWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 8px;
`;

export const HeaderBoardForm = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & h1 {
    font-size: 18px;
    font-weight: 500;
    margin: 0;
  }
  & button {
    cursor: pointer;
    background-color: transparent;
    border: none;
  }
`;

export const StyledCloseIcon = styles(CloseIcon)`
    transition: color 0.2s;
    color: #686868;
`;

export const TitleInput = styled(TextField)`
  & label {
    font-size: 14px;
    line-height: 16px;
  }
  & .MuiOutlinedInput-root input {
    font-size: 14px;
    padding: 12px;
  }
`;

export const CreateBoardForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
