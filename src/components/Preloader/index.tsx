import { Box, CircularProgress, SxProps } from '@mui/material';

export const Preloader = ({ color, sxContainer }: { color?: string; sxContainer?: SxProps }) => {
  return (
    <Box
      sx={{
        ...sxContainer,
      }}
    >
      <CircularProgress sx={{ color: color }} />
    </Box>
  );
};

Preloader.defaultProps = {
  sxContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
};
