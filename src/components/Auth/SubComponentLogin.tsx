import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TextField } from '@mui/material';
import { loginValidation } from '../../validation';

export const SubComponentLogin = () => {
  const { t } = useTranslation(['profile']);

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
          label={t('login')}
          type="login"
          size="medium"
          margin="dense"
          fullWidth
          onChange={field.onChange}
          value={field.value}
          error={!!errors.login?.message}
          helperText={errors.login?.message ?? ' '}
        />
      )}
    />
  );
};
