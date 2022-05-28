import styled from 'styled-components';
import { device, HEX_OPACITY } from '../../../constants';
import { columnStyles } from '../styles';

export const ColumnListItem = styled.li`
  height: 100%;
`;

export const ColumnContainer = styled.div`
  ${columnStyles};
  padding: 8px 32px 8px 8px;
  min-height: 45px;
  position: relative;
  background-color: ${(props) => props.theme.palette.primary.light + HEX_OPACITY['20']};
  opacity: ${(props: { isDragging: boolean }) => (props.isDragging ? '0' : '1')};
  cursor: 'grab';
`;

export const DeleteButtonContainer = styled.div`
  position: absolute;
  right: 4px;
  top: 4px;
`;

export const ColumnTitle = styled.h1`
  margin: 0;
  padding: 0;
  font-weight: 500;
  font-size: 18px;

  @media ${device.laptopL} {
    font-size: 20px;
  }
  @media ${device.desktop} {
    font-size: 24px;
  }
`;
