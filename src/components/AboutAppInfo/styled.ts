import styled from 'styled-components';
import laptopImage from '../../assets/img/laptop.png';
import { device } from '../../constants';

export const MainAboutAppContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const AboutAppContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 55px;
  justify-content: center;
  max-width: 750px;
  padding-top: 5%;
`;

export const Laptop = styled.img.attrs({
  src: `${laptopImage}`,
  alt: 'laptop',
})`
  margin-bottom: 15px;
  @media ${device.mobileS} {
    height: 200px;
    width: 220px;
  }
  @media ${device.tablet} {
    height: 300px;
    width: 320px;
  }
  @media ${device.laptop} {
    height: 400px;
    width: 440px;
  }
`;

export const AboutAppHeader = styled.p`
  margin-top: 5px;
  margin-bottom: 5px;
  @media ${device.mobileS} {
    font-size: 16px;
  }
  @media ${device.tablet} {
    font-size: 18px;
  }
  @media ${device.laptop} {
    font-size: 20px;
  }
`;

export const AboutAppText = styled.p`
  color: #7e7878;
  letter-spacing: 0.5px;
  line-height: 1.5;
  @media ${device.mobileS} {
    font-size: 14px;
  }
  @media ${device.laptop} {
    font-size: 16px;
  }
`;
