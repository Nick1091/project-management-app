import React, { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import { Error } from './styled';

export const ErrorMessage = ({ error, children }: { error?: FieldError; children?: ReactNode }) => {
  if (!error && !children) {
    return null;
  }
  return <Error>{error?.message || children}</Error>;
};
