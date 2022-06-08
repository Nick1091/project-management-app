import AutosizeInput from 'react-input-autosize';
import styled, { css } from 'styled-components';
import { HEX_OPACITY } from '../../../constants';

export const TitleContainer = styled.div`
  padding: 16px 0 50px 0;
  position: relative;
`;

const titleText = css`
  font-weight: 600;
  font-size: 24px;
`;

const descriptionText = css`
  font-size: 16px;
  font-weight: 400;
`;

const defaultBordersStyle = css`
  border: 2px solid ${(props) => props.theme.palette.primary.main + HEX_OPACITY['50']};
  border-radius: 4px;
  box-sizing: border-box;
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
      border-color: ${(props) => props.theme.palette.primary.main};
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
      border-color: ${(props) => props.theme.palette.primary.main};
    }
  }
`;

export const Actions = styled.div`
  position: absolute;
  bottom: 10px;
  left: 0;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
