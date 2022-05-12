import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';
import { loginValidation } from '../../validation';

export const SubComponentLogin = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name="login"
      rules={loginValidation}
      render={({ field }) => (
        <TextField
          {...field}
          variant="outlined"
          label="login"
          type="login"
          size="medium"
          margin="dense"
          fullWidth={true}
          onChange={field.onChange}
          value={field.value}
          error={!!errors.login?.message}
          helperText={errors.login?.message ?? ' '}
        />
      )}
    />
  );
};
