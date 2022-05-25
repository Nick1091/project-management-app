import { styled as styles } from '@mui/material/styles';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { styledBoard } from '../styles';
import { COLORS } from '../../../constants';

export const CreateBoardBtn = styles(Button)`
  padding: 8px;
  width: 100%;
  height: 100%;
`;

export const CreateBoardWrapper = styled.li`
  ${styledBoard};
  background-color: ${COLORS.SECOND.light};
  color: #fff;

  & button {
    color: inherit;
    font-size: 16px;
  }
`;
