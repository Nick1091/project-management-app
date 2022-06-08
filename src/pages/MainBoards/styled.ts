import styled from 'styled-components';
import { device } from '../../constants';

export const BoardsContainer = styled.ul`
  display: grid;
  flex-wrap: wrap;
  list-style-type: none;
  justify-content: flex-start;
  padding: 20px 0 20px 0;
  margin: 0;
  grid-template-columns: repeat(1, 100%);

  @media ${device.mobileL} {
    grid-template-columns: repeat(2, 50%);
  }
  @media ${device.tablet} {
    grid-template-columns: repeat(3, 33.3%);
  }
  @media ${device.laptop} {
    grid-template-columns: repeat(4, 25%);
  }
  @media ${device.desktopL} {
    grid-template-columns: repeat(5, 20%);
  } ;
`;
