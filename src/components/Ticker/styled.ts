import styled from 'styled-components';
import { device } from '../../constants';

export const TickerContainer = styled.div`
  white-space: 'nowrap';
  @media ${device.mobileS} {
    max-width: 310px;
    height: 20px;
  }
  @media ${device.mobileL} {
    max-width: 420px;
    height: 25px;
  }
  @media ${device.tablet} {
    max-width: 760px;
    height: 40px;
  }
  @media ${device.laptop} {
    max-width: 1000px;
    height: 80px;
  }
  @media ${device.laptopL} {
    max-width: 1200px;
    height: 80px;
  }
`;

export const TickerBox = styled.div`
  display: flex;
  width: '100vw';  
  flex-wrap: nowrap;
  @media ${device.mobileS} {
    gap: 15px;
  }
  @media ${device.mobileL} {
    gap: 15px;
  }
  @media ${device.tablet} {
    gap: 55px;
  }
  @media ${device.laptopL} {
    gap: 17%;
  }
  @media ${device.laptopL} {
    gap: 17%;
`;

export const TickerText = styled.p`
  color: #9faeb0;
  @media ${device.mobileS} {
    font-size: 14px;
  }
  @media ${device.mobileL} {
    font-size: 16px;
  }
  @media ${device.tablet} {
    font-size: 20px;
  }
  @media ${device.laptop} {
    font-size: 28px;
  }
`;
