import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import { nameValidation } from '../validation';

export const SubComponentName: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="name"
        rules={nameValidation}
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            label="name"
            type="name"
            size="medium"
            margin="dense"
            fullWidth={true}
            onChange={(e) => field.onChange(e)}
            value={field.value}
            error={!!errors.name?.message}
            helperText={errors.name?.message ?? ' '}
          />
        )}
      />
    </>
  );
};
