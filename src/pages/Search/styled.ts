import styled from 'styled-components';
import { device } from '../../constants';

export const SearchText = styled.h3`
  color: #139cff;
  font-weight: 500;
  margin: 0 auto;
  letter-spacing: 0.5px;
  line-height: 1.5;
  text-align: center;
  border-radius: 10px;
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

export const SearchCategory = styled.p`
  color: white;
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(68, 68, 167, 1) 0%,
    rgba(33, 176, 226, 1) 98%
  );
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
    font-size: 22px;
  }
`;

export const SearchCategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px;
  background-color: #ededef;
  gap: 3%;
  min-height: 80px;
`;

export const LazyImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 5%;
`;
