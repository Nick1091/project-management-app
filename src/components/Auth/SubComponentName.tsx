import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TextField } from '@mui/material';
import { nameValidation } from '../../validation';

export const SubComponentName = () => {
  const { t } = useTranslation(['profile']);

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name="name"
      rules={nameValidation}
      render={({ field }) => (
        <TextField
          {...field}
          variant="outlined"
          label={t('name')}
          type="name"
          size="medium"
          margin="dense"
          fullWidth
          onChange={field.onChange}
          value={field.value}
          error={!!errors.name?.message}
          helperText={errors.name?.message ?? ' '}
        />
      )}
    />
  );
};
