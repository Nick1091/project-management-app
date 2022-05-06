import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import Container from '@mui/material/Container';
import { ILoginObj } from '../components/auth';
import { LoginFormWrapperStyle } from '../components/auth';
import { SubComponentName } from '../components/auth';
import { SubComponentLogin } from '../components/auth';
import { SubComponentPassword } from '../components/auth';

export const RegistrationPage: React.FC = () => {
  const methods = useForm<ILoginObj>({
    defaultValues: {
      login: '',
      name: '',
      password: '',
    },
  });

  const { reset, handleSubmit } = methods;

  const onSubmit: SubmitHandler<ILoginObj> = (data) => {
    reset(data);
  };

  return (
    <Container sx={{ marginTop: '20vh' }} maxWidth="xs">
      <LoginFormWrapperStyle>
        <Typography variant="h6" component="h6">
          Registration
        </Typography>
        <Typography
          sx={{
            color: '#80808081',
            marginBottom: 2,
          }}
          variant="subtitle1"
          align="center"
          component="p"
        >
          If you don&apos;t have an account yet, create a one here
        </Typography>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <SubComponentName />
            <SubComponentLogin />
            <SubComponentPassword />
            <Button
              sx={{ marginTop: 2, paddingTop: 1 }}
              disableElevation={true}
              fullWidth={true}
              size="medium"
              type="submit"
              variant="contained"
            >
              register
            </Button>
          </form>
        </FormProvider>
      </LoginFormWrapperStyle>
    </Container>
  );
};
