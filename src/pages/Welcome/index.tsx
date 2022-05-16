import { AboutAppInfo } from '../../components/AboutAppInfo';
import { AboutTeamInfo } from '../../components/AboutTeamInfo';
import { WelcomeInfo } from '../../components/WelcomeInfo';
import { WelcomeContainer } from './styled';

export const Welcome = () => {
  return (
    <WelcomeContainer>
      <WelcomeInfo />
      <AboutAppInfo />
      <AboutTeamInfo />
    </WelcomeContainer>
  );
};
