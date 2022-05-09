import { styled as styles } from '@mui/material/styles';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { styledBoard } from '../../../styles/styledBoard';

export const CreateBoardBtn = styles(Button)`
  padding: 8px;
  width: 100%;
  height: 100%;
`;

export const CreateBoardWrapper = styled.li`
  ${styledBoard};
  background-color: #091e420a;
`;
