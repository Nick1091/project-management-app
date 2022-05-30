import styled from 'styled-components';
import { device } from '../../constants';

export const FooterContainer = styled.div`
  width: 100%;
  height: 72px;
  box-shadow: 0px -7px 25px 0px rgba(34, 60, 80, 0.2);
`;

export const DevsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1900px;
  margin: 0 auto;
  height: 72px;
  width: 100%;
  @media ${device.mobileS} {
    padding-left: 16px;
    padding-right: 16px;
  }
  @media ${device.laptop} {
    padding-left: 34px;
    padding-right: 34px;
  }
`;

export const DevContainer = styled.span`
  @media ${device.mobileS} {
    margin: 0 8px;
  }
  @media ${device.laptop} {
    margin: 0 16px;
  }
`;

export const RSSImg = styled.img`
  src: url(${(props) => props.src});
  @media ${device.mobileS} {
    width: 60px;
    height: 30px;
  }
  @media ${device.laptop} {
    width: 90px;
    height: 40px;
  }
`;
