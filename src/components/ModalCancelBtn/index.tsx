import React from 'react';
import { Button } from '@mui/material';

type ModalBtnProps = {
  children: React.ReactNode;
  handleClick?: () => void;
  colorBg?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  color?: string;
  type?: 'button' | 'submit' | 'reset';
  hoverColor?: string;
  width?: string;
  variant?: 'text' | 'outlined' | 'contained';
};

export const ModalBtn = ({
  width,
  variant,
  handleClick,
  colorBg,
  type,
  color,
  hoverColor,
  children,
}: ModalBtnProps) => {
  return (
    <Button
      variant={variant}
      type={type}
      color={colorBg}
      sx={{
        width,
        color,
        borderColor: color,
        '&:hover': { borderColor: hoverColor },
      }}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};
