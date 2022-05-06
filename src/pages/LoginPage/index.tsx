import React from 'react';
import { Typography, Container } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { SubTitle, SubTitleError } from './LoginPageStyle';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import {
  LoginFormWrapperStyle,
  SubComponentLogin,
  SubComponentPassword,
  ILoginObj,
  fetchToken,
} from '../../components/auth';

export const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    authUser: { error, token, isLoading },
  } = useAppSelector((state) => state.authUser);
  console.log(token);

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
          <SubTitleError>{error}</SubTitleError>
        ) : (
          <SubTitle>If you already have an account, just login</SubTitle>
        )}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <SubComponentLogin />
            <SubComponentPassword />
            <LoadingButton
              loading={isLoading}
              sx={{ marginTop: 2, paddingTop: 1 }}
              disableElevation={true}
              fullWidth={true}
              size="medium"
              type="submit"
              loadingPosition="end"
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
