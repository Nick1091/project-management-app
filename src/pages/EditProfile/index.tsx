import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { Typography, Container, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { SubComponentLogin, SubComponentName, SubComponentPassword } from '../../components/Auth';
import { LoginFormWrapperStyle, SubTitle } from './styled';
import { putCredentialsData, getUserId, deleteUser } from '../../requests';
import { ILoginObj } from '../../types';
import { ConfirmModal } from '../../components/ConfirmModal';

export const EditProfile = () => {
  const dispatch = useAppDispatch();
  const {
    authUser: { error, isLoading, token, id },
  } = useAppSelector((state) => state.authUser);

  const [isOpenConfirmModalDelete, setIsOpenConfirmModalDelete] = useState(false);

  const methods = useForm<ILoginObj>({
    defaultValues: {
      name: '',
      login: '',
      password: '',
    },
  });

  const { handleSubmit } = methods;

  useEffect(() => {
    token && dispatch(getUserId(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit: SubmitHandler<ILoginObj> = async (data, e) => {
    e?.preventDefault();
    token && id && dispatch(putCredentialsData({ ...data, token, id }));
    methods.reset();
  };

  return (
    <Container sx={{ marginTop: '10vh' }} maxWidth="xs">
      <LoginFormWrapperStyle>
        <Typography variant="h6" component="h6">
          Edit Profile
        </Typography>
        {error ? (
          <SubTitle color="#d40000">{error}</SubTitle>
        ) : (
          <SubTitle color="#80808081">Please enter your new user details</SubTitle>
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
              Edit
            </LoadingButton>
          </form>
          <Button
            onClick={() => {
              setIsOpenConfirmModalDelete(true);
            }}
            size="small"
            sx={{ mt: '20px' }}
            variant="text"
          >
            click here to delete your profile
          </Button>
          {isOpenConfirmModalDelete && (
            <ConfirmModal
              isOpen={isOpenConfirmModalDelete}
              handleSubmit={() => {
                console.log(id);
                token && id && dispatch(deleteUser({ token, id }));
              }}
              alertText={`Do you really want to delete profile?`}
              closeModal={() => {
                setIsOpenConfirmModalDelete(false);
              }}
            />
          )}
        </FormProvider>
      </LoginFormWrapperStyle>
    </Container>
  );
};
