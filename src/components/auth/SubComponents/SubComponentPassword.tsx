import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';
import { passwordValidation } from '../validation';

export const SubComponentPassword: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      control={control}
      name="password"
      rules={passwordValidation}
      render={({ field }) => (
        <TextField
          {...field}
          variant="outlined"
          label="password"
          type="password"
          size="medium"
          margin="dense"
          fullWidth={true}
          onChange={field.onChange}
          value={field.value}
          error={!!errors.password?.message}
          helperText={errors.password?.message ?? ' '}
        />
      )}
    />
  );
};
