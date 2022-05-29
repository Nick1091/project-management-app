import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import useWindowDimensions from '../../hooks';
import welcomeImg from '../../assets/img/welcome.png';
import {
  AppName,
  Description,
  LeftBox,
  MainBox,
  MainWelcomeContent,
  RightBox,
  Welcome,
} from './styled';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { size } from '../../constants';

export const WelcomeInfo = () => {
  const { t } = useTranslation(['common']);
  const { width } = useWindowDimensions();

  return (
    <MainBox>
      <MainWelcomeContent>
        <LeftBox>
          <Welcome>{t('Welcome')}</Welcome>
          <AppName>Reactive Area App</AppName>
          <Description>{t('AppDescription')}</Description>
        </LeftBox>
        <RightBox>
          {width >= size.laptopL && width <= size.desktopL && (
            <LazyLoadImage effect="blur" height={660} width={670} src={welcomeImg} />
          )}
          {width >= size.laptop && width < size.laptopL && (
            <LazyLoadImage effect="blur" height={590} width={590} src={welcomeImg} />
          )}
          {width >= size.tablet && width < size.laptop && (
            <LazyLoadImage effect="blur" height={470} width={430} src={welcomeImg} />
          )}
          {width >= size.mobileL && width < size.tablet && (
            <LazyLoadImage effect="blur" height={390} width={380} src={welcomeImg} />
          )}
          {width >= size.mobileS && width < size.mobileL && (
            <LazyLoadImage effect="blur" height={290} width={280} src={welcomeImg} />
          )}
        </RightBox>
      </MainWelcomeContent>
    </MainBox>
  );
};
