import styled from 'styled-components';
import { device } from '../../constants';
import courseImg from '../../assets/img/course.png';

export const CourseContainer = styled.div`
  display: flex;
  justify-self: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
`;

export const CourseInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  @media ${device.laptop} {
    max-height: 800px;
    max-width: 700px;
  }
  @media ${device.desktop} {
    max-height: 800px;
    max-width: 900px;
  }
`;

export const NameCourse = styled.span`
  font-size: 26px;
  color: #139cff;
`;

export const Subtitle = styled.span`
  font-size: 18px;
  color: #7e7878;
  padding-top: 20px;
`;

export const MainCourseInfo = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 12%;
  gap: 14%;
  max-width: 750px;
`;

export const CourseImage = styled.img.attrs({
  src: `${courseImg}`,
  alt: 'course image',
})`
  margin: 20px auto;
  @media ${device.mobileS} {
    height: 290px;
    width: 180px;
  }
  @media ${device.mobileL} {
    height: 490px;
    width: 250px;
  }
  @media ${device.tablet} {
    height: 580px;
    width: 340px;
  }
  @media ${device.laptop} {
    height: 700px;
    width: 380px;
  }
`;
