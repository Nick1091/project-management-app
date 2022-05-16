import { Box, Typography } from '@mui/material';

export const AboutTeamInfo = () => {
  return (
    <Box
      bgcolor="#EDEDEF"
      sx={{
        maxWidth: 1920,
        minHeight: 470,
        width: '98.74vw',
        paddingTop: 4,
      }}
    >
      <Typography
        sx={{ fontSize: '20px', color: '#504D66', fontWeight: '500', textAlign: 'center' }}
      >
        About Team
      </Typography>
    </Box>
  );
};
