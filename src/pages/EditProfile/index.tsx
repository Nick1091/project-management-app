import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { Typography, Container, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { SubComponentLogin, SubComponentName, SubComponentPassword } from '../../components/Auth';
import { LoginFormWrapperStyle, SubTitle } from './styled';
import { putCredentialsData, deleteUser } from '../../requests';
import { ILoginObj } from '../../types';
import { ConfirmModal } from '../../components/ConfirmModal';

export const EditProfile = () => {
  const { t } = useTranslation(['common']);
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

  const onSubmit: SubmitHandler<ILoginObj> = async (data, e) => {
    e?.preventDefault();
    token && id && dispatch(putCredentialsData({ ...data, token, id }));
    methods.reset();
  };

  return (
    <Container sx={{ paddingTop: '10vh' }} maxWidth="xs">
      <LoginFormWrapperStyle>
        <Typography variant="h6" component="h6">
          {t('EditProfile')}
        </Typography>
        {error ? (
          <SubTitle color="#d40000">{error}</SubTitle>
        ) : (
          <SubTitle color="#80808081">{t('NewUserDetails')}</SubTitle>
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
              {t('Edit')}
            </LoadingButton>
          </form>
          <Button
            onClick={() => {
              setIsOpenConfirmModalDelete(true);
            }}
            size="small"
            color="error"
            sx={{ mt: '20px' }}
            variant="text"
          >
            {t('DeleteProfile')}
          </Button>
          {isOpenConfirmModalDelete && (
            <ConfirmModal
              isOpen={isOpenConfirmModalDelete}
              handleSubmit={() => {
                token && id && dispatch(deleteUser({ token, id }));
              }}
              alertText={t('DoYouReallyWantToDelete')}
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
