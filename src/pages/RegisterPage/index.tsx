import React from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { Typography, Container } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { SubComponentName, SubComponentLogin, SubComponentPassword } from '../../components/Auth';
import { fetchLogin, fetchToken } from '../../requests';
import { LoginFormWrapperStyle, SubTitle } from './styled';
import { ILoginObj } from '../../types';

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const {
    authUser: { error, isLoading },
  } = useAppSelector((state) => state.authUser);

  const methods = useForm<ILoginObj>({
    defaultValues: {
      login: '',
      name: '',
      password: '',
    },
  });

  const { handleSubmit } = methods;
  const onSubmit: SubmitHandler<ILoginObj> = async (data, e) => {
    e?.preventDefault();
    const createUser = await dispatch(fetchLogin(data));
    createUser.meta.requestStatus !== 'rejected' && dispatch(fetchToken(data));
  };
  return (
    <Container sx={{ marginTop: '10vh' }} maxWidth="xs">
      <LoginFormWrapperStyle>
        <Typography variant="h6" component="h6">
          Registration
        </Typography>
        {error ? (
          <SubTitle color={'#d40000'}>{error}</SubTitle>
        ) : (
          <SubTitle color={'#80808081'}>
            If you don&apos;t have an account yet, create one here
          </SubTitle>
        )}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <SubComponentName />
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
              register
            </LoadingButton>
          </form>
        </FormProvider>
      </LoginFormWrapperStyle>
    </Container>
  );
};
