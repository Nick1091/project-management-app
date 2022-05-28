import { device } from '../../constants';
import styled from 'styled-components';
import waveImg from '../../assets/img/wave.png';

export const MainBox = styled.div`
  min-width: 98.6vw;
  min-height: 93.5vh;
  padding: 0;
  background-image: url(${waveImg});
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 100;
  @media ${device.laptopL} {
    width: 99.1vw;
  }
`;

export const MainWelcomeContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 3%;
  flex-wrap: wrap;
`;

export const LeftBox = styled.div`
  padding-left: 34px;
  padding-right: 34px;
  @media ${device.mobileS} {
    max-width: 700px;
    max-height: 800px;
  }
  @media ${device.tablet} {
    max-width: 700px;
    max-height: 800px;
  }
  @media ${device.laptop} {
    max-width: 600px;
    max-height: 800px;
  }
  @media ${device.desktop} {
    max-width: 750px;
    max-height: 800px;
  }
`;

export const RightBox = styled.div`
  margin-top: 3%;
  @media ${device.mobileS} {
    max-width: 630px;
    max-height: 820px;
  }
  @media ${device.tablet} {
    max-width: 630px;
    max-height: 820px;
  }
  @media ${device.laptop} {
    max-width: 600px;
    max-height: 820px;
  }
  @media ${device.desktop} {
    max-width: 930px;
    max-height: 820px;
  }
`;

export const Welcome = styled.p`
  color: #7e7878;
  margin: 0;
  @media ${device.mobileS} {
    padding-top: 20px;
    font-size: 18px;
  }
  @media ${device.laptop} {
    font-size: 22px;
  }
  @media ${device.desktop} {
    font-size: 24px;
  }
`;

export const AppName = styled.p`
  color: #139cff;
  font-weight: 500;
  margin: 0;
  @media ${device.mobileS} {
    font-size: 40px;
  }
  @media ${device.laptop} {
    font-size: 54px;
  }
  @media ${device.desktop} {
    font-size: 56px;
  }
`;

export const Description = styled.p`
  color: #7e7878;
  margin: 0;
  line-height: 1.5;
  letter-spacing: 0.5px;
  @media ${device.mobileS} {
    font-size: 14px;
  }
  @media ${device.tablet} {
    font-size: 18px;
  }
`;
