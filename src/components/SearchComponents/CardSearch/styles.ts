import styled from 'styled-components';
import { device } from '../../../constants';

export const SearchText = styled.h3`
  color: #139cff;
  font-weight: 500;
  margin: 0 auto;
  letter-spacing: 0.5px;
  line-height: 1.5;
  text-align: center;
  @media ${device.mobileS} {
    font-size: 20px;
  }
  @media ${device.tablet} {
    font-size: 28px;
  }
  @media ${device.laptop} {
    font-size: 26px;
  }
`;
