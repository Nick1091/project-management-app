import React, { useState } from 'react';
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

  const [isOpenConfirmModalEdit, setIsOpenConfirmModalEdit] = useState(false);
  const [isOpenConfirmModalDelete, setIsOpenConfirmModalDelete] = useState(false);
  const [dataDetails, setDataDetails] = useState<ILoginObj>();

  const methods = useForm<ILoginObj>({
    defaultValues: {
      name: '',
      login: '',
      password: '',
    },
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<ILoginObj> = (data, e) => {
    e?.preventDefault();
    setDataDetails(data);
    setIsOpenConfirmModalEdit(true);
    token && dispatch(getUserId(token));
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
            {isOpenConfirmModalEdit && (
              <ConfirmModal
                isOpen={isOpenConfirmModalEdit}
                handleSubmit={() => {
                  token &&
                    id &&
                    dataDetails &&
                    dispatch(putCredentialsData({ ...dataDetails, token, id }));
                }}
                alertText={`Do you really want to edit profile?`}
                closeModal={() => {
                  setIsOpenConfirmModalEdit(false);
                }}
              />
            )}
          </form>
          <Button
            onClick={() => setIsOpenConfirmModalDelete(true)}
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
