import Marquee from 'react-fast-marquee';
import { TickerBox, TickerContainer, TickerText } from './styled';

export const Ticker = () => {
  return (
    <TickerContainer>
      <Marquee>
        <TickerBox>
          <TickerText>React</TickerText>
          <TickerText>Redux</TickerText>
          <TickerText>TypeScript</TickerText>
          <TickerText>Material&nbsp;UI</TickerText>
          <TickerText>Styled&nbsp;Components</TickerText>
        </TickerBox>
      </Marquee>
    </TickerContainer>
  );
};
