import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../../../hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { BoardInputs } from '../../../types/boardTypes';
import { boardFormSchema } from '../../../validation';
import { editBoard } from '../../../requests';
import AutosizeInput from 'react-input-autosize';
import { ErrorMessage } from '../../../components/ErrorMessage';
import { Button } from '@mui/material';
import { Actions, Form, Title, TitleContainer } from './styled';

export const BoardTitle = ({
  boardTitle,
  token,
  id,
}: {
  boardTitle: string;
  token: string | null;
  id?: string;
}) => {
  const [newTitle, setNewTitle] = useState(boardTitle);
  const [isTitleHidden, setIsTitleHidden] = useState(false);
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<BoardInputs>({
    resolver: yupResolver(boardFormSchema),
    defaultValues: { title: boardTitle },
  });

  useEffect(() => {
    if (getValues('title') !== boardTitle) {
      setValue('title', boardTitle);
    }
    if (newTitle !== boardTitle) {
      setNewTitle(boardTitle);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardTitle]);

  const titleSubmitHandler = (formState: BoardInputs) => {
    if (formState.title !== newTitle) {
      setNewTitle(formState.title);
      if (token && id) dispatch(editBoard({ token, id, title: formState.title }));
    }
    setIsTitleHidden(false);
  };

  return (
    <TitleContainer>
      <Title isTitleHidden={isTitleHidden} onClick={() => setIsTitleHidden(true)}>
        {newTitle}
      </Title>
      <Form onSubmit={handleSubmit(titleSubmitHandler)} isTitleHidden={isTitleHidden}>
        <Controller
          render={({ field }) => <AutosizeInput {...field} />}
          name="title"
          control={control}
        />
        <Actions>
          <Button
            type="button"
            color="error"
            size="small"
            onClick={() => {
              setIsTitleHidden(false);
              setValue('title', newTitle);
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
