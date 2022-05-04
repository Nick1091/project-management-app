import styled from '@emotion/styled';
import { Grid, Switch } from '@mui/material';

const Toggler = styled.p`
  margin-right: 30px;
`;

export const LocalizationToggler = () => {
  return (
    <Toggler>
      <Grid component="label" container alignItems="center" spacing={0.5}>
        <Grid item>ru</Grid>
        <Grid item>
          <Switch color="default" />
        </Grid>
        <Grid item>en</Grid>
      </Grid>
    </Toggler>
  );
};
