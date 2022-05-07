import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '../ErrorMessage';
import { token } from '../../config/config';
import { createBoard } from '../../store/boardsSlice';
import { useDispatch } from 'react-redux';
import { Button, IconButton, TextField } from '@mui/material';
import { AppDispatch } from '../../store/store';
import { styled as styles } from '@mui/material/styles';
import styled from 'styled-components';

const NewBoardFormWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 8px;
`;

const HeaderBoardForm = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & h1 {
    font-size: 16px;
    font-weight: 400;
    margin: 0;
  }
  & button {
    cursor: pointer;
    background-color: transparent;
    border: none;
    & svg:hover {
      color: #000;
    }
  }
`;

const StyledCloseIcon = styles(CloseIcon)`
    transition: color 0.2s;
    color: #686868;
`;

const TitleInput = styled(TextField)`
  & label {
    font-size: 14px;
    line-height: 16px;
  }
  & .MuiOutlinedInput-root input {
    font-size: 14px;
    padding: 12px;
  }
`;

const CreateBoardForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const boardFormSchema = yup.object({ title: yup.string().required('This field is required') });

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

  const dispatch = useDispatch<AppDispatch>();

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
          {...register('title')}
        />
        <ErrorMessage error={errors.title} />
        <Button type="submit" variant="outlined" disabled={Boolean(errors.title)}>
          Create
        </Button>
      </CreateBoardForm>
    </NewBoardFormWrapper>
  );
};
