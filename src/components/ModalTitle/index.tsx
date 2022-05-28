import React from 'react';
import { Typography } from '@mui/material';

export const ModalTitle = ({
  children,
  marginBottom,
}: {
  children: React.ReactNode;
  marginBottom?: string;
}) => {
  return (
    <Typography
      variant="h1"
      sx={{
        fontSize: '21px',
        lineHeight: '1.5',
        fontWeight: '500',
        overflow: 'hidden',
        marginBottom,
      }}
    >
      {children}
    </Typography>
  );
};

ModalTitle.defaultProps = {
  marginBottom: '16px',
};
