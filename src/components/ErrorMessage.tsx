import React from 'react';
import { FieldError } from 'react-hook-form';
import styled from 'styled-components';

const Error = styled.span`
  font-size: 14px;
  color: #d40e00;
`;

export const ErrorMessage = ({ error }: { error?: FieldError }) => {
  if (!error) {
    return null;
  }
  return <Error>{error.message}</Error>;
};
