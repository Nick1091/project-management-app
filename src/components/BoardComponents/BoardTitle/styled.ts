import styled, { css } from 'styled-components';

export const TitleContainer = styled.div`
  padding: 16px 0 40px 0;
`;

const titleText = css`
  font-size: 24px;
  border-radius: 4px;
  font-weight: 600;
  border-style: solid;
  border-width: 1px;
`;

export const Form = styled.form`
  display: ${(props: { isTitleHidden: boolean; inputWidth?: number }) =>
    props.isTitleHidden ? 'flex' : 'none'};
  & input {
    ${titleText};
    border-color: #000;
    padding: 4px;
    max-width: 100%;
  }
  flex-direction: column;
  position: relative;
`;

export const Title = styled.h1`
  display: ${(props: { isTitleHidden: boolean }) => (props.isTitleHidden ? 'none' : '-webkit-box')};
  ${titleText};
  border-color: transparent;
  padding: 0;
  margin: 0;
  background-color: -internal-light-dark(rgb(255, 255, 255), rgb(59, 59, 59));
  padding: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`;

export const Actions = styled.div`
  position: absolute;
  top: 42px;
  left: 0;
`;
