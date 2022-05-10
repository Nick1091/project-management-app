import React from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { Typography, Container } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { SubComponentLogin, SubComponentPassword } from '../../components/Auth';
import { LoginFormWrapperStyle, SubTitle } from './styled';
import { fetchToken } from '../../requests';
import { ILoginObj } from '../../types';

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const {
    authUser: { error, isLoading },
  } = useAppSelector((state) => state.authUser);

  const methods = useForm<ILoginObj>({
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<ILoginObj> = (data, e) => {
    e?.preventDefault();
    dispatch(fetchToken(data));
  };

  return (
    <Container sx={{ marginTop: '10vh' }} maxWidth="xs">
      <LoginFormWrapperStyle>
        <Typography variant="h6" component="h6">
          Login
        </Typography>
        {error ? (
          <SubTitle color="#d40000">{error}</SubTitle>
        ) : (
          <SubTitle color="#80808081">If you already have an account, just login</SubTitle>
        )}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <SubComponentLogin />
            <SubComponentPassword />
            <LoadingButton
              loading={isLoading}
              sx={{ marginTop: 2, paddingTop: 1 }}
              disableElevation
              fullWidth
              size="medium"
              type="submit"
              variant="contained"
            >
              Login
            </LoadingButton>
          </form>
        </FormProvider>
      </LoginFormWrapperStyle>
    </Container>
  );
};
