import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { HEX_OPACITY } from '../../../constants';
import { styledBoard } from '../styles';

export const Board = styled('li')`
  ${styledBoard}
  background-color: ${(props) => props.theme.palette.secondary.light + HEX_OPACITY['30']};
  position: relative;
`;

const textContainerStyles = css`
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  display: -webkit-box;
`;

export const Title = styled.h1`
  font-weight: 600;
  margin: 0;
  font-size: 16px;
  ${textContainerStyles};
  -webkit-line-clamp: 1;
`;

export const Description = styled.p`
  margin: 0;
  color: rgba(0, 0, 0, 0.75);
  font-size: 14px;
  ${textContainerStyles};
  -webkit-line-clamp: 2;
`;

export const BoardLink = styled(NavLink)`
  width: 100%;
  height: 100%;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  padding: 8px 32px 8px 8px;
  color: #111111;
`;

export const DeleteBtnContainer = styled.div`
  position: absolute;
  right: 4px;
  top: 4px;
`;
