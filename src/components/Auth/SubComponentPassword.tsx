import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TextField } from '@mui/material';
import { passwordValidation } from '../../validation';

export const SubComponentPassword = () => {
  const { t } = useTranslation(['profile']);

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
          label={t('password')}
          type="password"
          size="medium"
          margin="dense"
          fullWidth
          onChange={field.onChange}
          value={field.value}
          error={!!errors.password?.message}
          helperText={errors.password?.message ?? ' '}
        />
      )}
    />
  );
};
