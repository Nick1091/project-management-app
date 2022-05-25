import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { createBoard } from '../../requests';
import { boardFormSchema } from '../../validation';
import { BoardInputs } from '../../types';
import {
  CreateBoardForm,
  NewBoardFormWrapper,
  TitleInput,
} from '../MainBoardsComponents/NewBoardForm/styled';
import { CreateBoardHeader } from './styled';

type Props = { handleCloseModal: () => void };

export const NewBoardFormModal: React.FC<Props> = ({ handleCloseModal }) => {
  const navigate = useNavigate();
  const { t } = useTranslation(['common']);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BoardInputs>({ resolver: yupResolver(boardFormSchema) });
  const {
    authUser: { token },
  } = useAppSelector((state) => state.authUser);

  const handleBoardFormSubmit = async (formData: BoardInputs) => {
    if (token) {
      const newBoard = dispatch(
        createBoard({ token, title: formData.title, description: formData.description })
      );
      reset();
      handleCloseModal();
      navigate('/main/board/' + (await newBoard).payload.id);
    }
  };

  return (
    <NewBoardFormWrapper>
      <CreateBoardHeader>{t('CreateBoard')}</CreateBoardHeader>
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
