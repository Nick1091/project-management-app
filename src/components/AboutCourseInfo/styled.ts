import styled from 'styled-components';

export const CourseContainer = styled.div`
  display: flex;
  justify-self: center;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 55px;
  max-width: 750px;
  max-height: 390px;
`;

export const CourseInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  max-width: 900px;
  max-height: 610px;
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
  padding-top: 18%;
  gap: 14%;
  max-width: 750px;
  max-height: 390px;
`;
