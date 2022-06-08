import styled from 'styled-components';
import { device } from '../../../constants';

export const SearchItem = styled.div`
  color: #139cff;
  letter-spacing: 0.5px;
  line-height: 1.5;
  text-align: center;
  @media ${device.mobileS} {
    font-size: 14px;
  }
  @media ${device.laptop} {
    font-size: 16px;
  }
`;
