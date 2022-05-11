import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useAppDispatch } from '../../../hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { token } from '../../../config';
import { createBoard } from '../../../requests';
import { Button, IconButton } from '@mui/material';
import {
  CreateBoardForm,
  HeaderBoardForm,
  NewBoardFormWrapper,
  StyledCloseIcon,
  TitleInput,
} from './styled';

const boardFormSchema = yup.object({
  title: yup
    .string()
    .required('This field is required')
    .max(60, 'Field should be 60 characters maximum'),
});

type BoardInputs = {
  title: string;
};

export const NewBoardForm = ({ handleClosePopover }: { handleClosePopover: () => void }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BoardInputs>({ resolver: yupResolver(boardFormSchema) });
  const dispatch = useAppDispatch();
  const handleBoardFormSubmit = (formData: BoardInputs) => {
    dispatch(createBoard({ token, title: formData.title }));
    reset();
    handleClosePopover();
  };

  return (
    <NewBoardFormWrapper>
      <HeaderBoardForm>
        <h1>Create board</h1>
        <IconButton onClick={handleClosePopover}>
          <StyledCloseIcon />
        </IconButton>
      </HeaderBoardForm>
      <CreateBoardForm onSubmit={handleSubmit(handleBoardFormSubmit)}>
        <TitleInput
          id="outlined-basic"
          label="Board Title"
          variant="outlined"
          error={Boolean(errors.title)}
          helperText={errors.title?.message}
          {...register('title')}
        />
        <Button type="submit" variant="outlined" disabled={Boolean(errors.title)}>
          Create
        </Button>
      </CreateBoardForm>
    </NewBoardFormWrapper>
  );
};
