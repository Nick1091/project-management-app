import styled from 'styled-components';
import waveSrc from '../../assets/img/wave.svg';

export const MainWelcomeContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Wave = styled.div`
  position: absolute;
  z-index: -1;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 360px;
  background-image: url(${waveSrc});
  background-repeat: no-repeat;
  background-size: cover;
`;
