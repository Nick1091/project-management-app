import { styledBoard } from '../../../styles/styledBoard';
import { IconButton } from '@mui/material';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { styled as styles } from '@mui/material/styles';

export const Board = styled.li`
  ${styledBoard};
  position: relative;
  & span {
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 2;
  }
`;

export const BoardLink = styled(NavLink)`
  width: 100%;
  height: 100%;
  text-decoration: none;
  display: block;
  padding: 8px 24px 8px 8px;
  color: #111111;
`;

export const DeleteBtn = styles(IconButton)`
  position: absolute;
  right: 4px;
  top: 4px;
`;
