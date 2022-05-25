import AutosizeInput from 'react-input-autosize';
import styled, { css } from 'styled-components';

export const TitleContainer = styled.div`
  padding: 16px 0 50px 0;
  position: relative;
`;

const titleText = css`
  font-size: 24px;
  font-weight: 600;
`;

const descriptionText = css`
  font-size: 16px;
  font-weight: 400;
`;

const defaultBordersStyle = css`
  border: none;
  border-bottom: 2px solid #000;
`;

const resizeInputText = css`
  display: -webkit-box;
  border-color: transparent;
  padding: 0;
  margin: 0;
  padding: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`;

const showedBoard = css`
  padding: 4px;
  max-width: 100%;
`;

export const Form = styled.form`
  display: ${(props: { isTitleHidden: boolean; inputWidth?: number }) =>
    props.isTitleHidden ? 'flex' : 'none'};
  gap: 4px;
  flex-direction: column;
`;

export const Title = styled.h1`
  ${titleText};
  ${defaultBordersStyle};
  ${resizeInputText};
`;

export const TextContainer = styled.div`
  display: ${(props: { isTextHidden: boolean }) => (props.isTextHidden ? 'none' : 'inline-flex')};
  gap: 4px;
  flex-direction: column;
`;

export const Description = styled.p`
  ${descriptionText};
  ${defaultBordersStyle};
  ${resizeInputText};
`;

export const TitleInput = styled(AutosizeInput)`
  & input {
    ${titleText};
    ${defaultBordersStyle};
    ${showedBoard};

    &:focus-visible {
      outline: none;
    }
  }
`;

export const DescriptionInput = styled(AutosizeInput)`
  & input {
    ${descriptionText};
    ${defaultBordersStyle};
    ${showedBoard};

    &:focus-visible {
      outline: none;
    }
  }
`;

export const Actions = styled.div`
  position: absolute;
  bottom: 10px;
  left: 0;
`;
