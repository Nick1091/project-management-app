import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { LoadingButton } from '@mui/lab';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  fetchLogin,
  ILoginObj,
  LoginFormWrapperStyle,
  SubComponentName,
  SubComponentLogin,
  SubComponentPassword,
  fetchToken,
} from '../../components/auth';
import { SubTitleError, SubTitle } from './RegisterPageStyle';

export const RegisterPage: React.FC = () => {
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
          <SubTitleError>{error}</SubTitleError>
        ) : (
          <SubTitle>If you don&apos;t have an account yet, create one here</SubTitle>
        )}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <SubComponentName />
            <SubComponentLogin />
            <SubComponentPassword />
            <LoadingButton
              loading={isLoading}
              sx={{ marginTop: 2, paddingTop: 1 }}
              disableElevation={true}
              fullWidth={true}
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
