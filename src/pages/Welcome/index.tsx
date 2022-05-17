import { AboutAppInfo } from '../../components/AboutAppInfo';
import { AboutCourseInfo } from '../../components/AboutCourseInfo';
import { AboutTeamInfo } from '../../components/AboutTeamInfo';
import { Ticker } from '../../components/Ticker';
import { WelcomeInfo } from '../../components/WelcomeInfo';
import { WelcomeContainer } from './styled';

export const Welcome = () => {
  return (
    <WelcomeContainer>
      <WelcomeInfo />
      <AboutAppInfo />
      <AboutTeamInfo />
      <Ticker />
      <AboutCourseInfo />
    </WelcomeContainer>
  );
};
