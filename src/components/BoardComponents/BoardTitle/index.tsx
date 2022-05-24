import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../hooks';
import { BoardInputs } from '../../../types/boardTypes';
import { boardFormSchema } from '../../../validation';
import { editBoard } from '../../../requests';
import { ErrorMessage } from '../../../components/ErrorMessage';
import {
  Actions,
  Form,
  Title,
  TitleContainer,
  TextContainer,
  Description,
  DescriptionInput,
  TitleInput,
} from './styled';

type BoardTitleProps = {
  token: string | null;
  title: string;
  description: string;
  id?: string;
};

export const BoardTitle = ({ token, id, title, description }: BoardTitleProps) => {
  const dispatch = useAppDispatch();
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [isTextHidden, setIsTextHidden] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BoardInputs>({
    resolver: yupResolver(boardFormSchema),
    defaultValues: { title, description },
  });

  const titleSubmitHandler = (formState: BoardInputs) => {
    if (formState.title !== newTitle || formState.description !== newDescription) {
      setNewTitle(formState.title);
      setNewDescription(formState.description);
      if (token && id)
        dispatch(
          editBoard({ token, id, title: formState.title, description: formState.description })
        );
    }
    setIsTextHidden(false);
  };

  return (
    <TitleContainer>
      <TextContainer isTextHidden={isTextHidden} onClick={() => setIsTextHidden(true)}>
        <Title>{newTitle}</Title>
        <Description>{newDescription}</Description>
      </TextContainer>
      <Form onSubmit={handleSubmit(titleSubmitHandler)} isTitleHidden={isTextHidden}>
        <Controller
          render={({ field }) => <TitleInput {...field} />}
          name="title"
          control={control}
        />
        <Controller
          render={({ field }) => <DescriptionInput {...field} />}
          name="description"
          control={control}
        />
        <Actions>
          <Button
            type="button"
            color="error"
            size="small"
            onClick={() => {
              setIsTextHidden(false);
              setValue('title', newTitle);
              setValue('description', newDescription);
            }}
          >
            Cancel
          </Button>
          <Button sx={{ marginRight: '16px' }} variant="outlined" size="small" type="submit">
            Submit
          </Button>
          <ErrorMessage error={errors.title} />
        </Actions>
      </Form>
    </TitleContainer>
  );
};
