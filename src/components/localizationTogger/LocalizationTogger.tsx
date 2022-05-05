import { Grid, Switch } from '@mui/material';
import { Toggler } from './LocalizationTogger-styles';

export const LocalizationToggler = () => {
  return (
    <Toggler>
      <Grid component="label" container alignItems="center" spacing={0.5}>
        <Grid item>en</Grid>
        <Grid item>
          <Switch color="default" />
        </Grid>
        <Grid item>ru</Grid>
      </Grid>
    </Toggler>
  );
};
