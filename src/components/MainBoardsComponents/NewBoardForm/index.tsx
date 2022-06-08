import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { createBoard } from '../../../requests';
import { boardFormSchema } from '../../../validation';
import { Button, IconButton } from '@mui/material';
import { BoardInputs } from '../../../types/boardTypes';
import {
  CreateBoardForm,
  HeaderBoardForm,
  NewBoardFormWrapper,
  StyledCloseIcon,
  TitleInput,
} from './styled';

export const NewBoardForm = ({ handleClosePopover }: { handleClosePopover: () => void }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BoardInputs>({ resolver: yupResolver(boardFormSchema) });
  const dispatch = useAppDispatch();
  const {
    authUser: { token },
  } = useAppSelector((state) => state.authUser);
  const { t } = useTranslation(['common']);

  const handleBoardFormSubmit = (formData: BoardInputs) => {
    if (token)
      dispatch(createBoard({ token, title: formData.title, description: formData.description }));
    reset();
    handleClosePopover();
  };

  return (
    <NewBoardFormWrapper>
      <HeaderBoardForm>
        <h1>{t('CreateBoard')}</h1>
        <IconButton onClick={handleClosePopover}>
          <StyledCloseIcon />
        </IconButton>
      </HeaderBoardForm>
      <CreateBoardForm onSubmit={handleSubmit(handleBoardFormSubmit)}>
        <TitleInput
          id="outlined-basic"
          label={t('Title')}
          variant="outlined"
          error={Boolean(errors.title)}
          helperText={errors.title?.message}
          {...register('title')}
        />
        <TitleInput
          id="outlined-basic"
          label={t('Description')}
          variant="outlined"
          error={Boolean(errors.description)}
          helperText={errors.description?.message}
          {...register('description')}
        />
        <Button type="submit" variant="outlined" disabled={Boolean(errors.title)}>
          {t('Create')}
        </Button>
      </CreateBoardForm>
    </NewBoardFormWrapper>
  );
};
