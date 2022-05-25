import { yupResolver } from '@hookform/resolvers/yup';
import { Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { DeleteForever } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { editTask, deleteTask } from '../../../requests';
import { TaskInputs, TaskState } from '../../../types';
import { taskFormSchema } from '../../../validation';
import { ConfirmModal } from '../../ConfirmModal';
import { ModalWithForm } from '../../ModalWithForm';
import { getInputs } from '../ColumnComponent/inputsOptions';
import { DeleteBtn, Task, TaskButton } from './styled';

export const TaskContainer = (props: TaskState) => {
  const { t } = useTranslation(['task']);

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isVisibleRemoveBt, setIsVisibleRemoveBt] = useState(false);
  const [isOpenConfirmWindow, setIsOpenConfirmWindow] = useState(false);
  const dispatch = useAppDispatch();
  const {
    authUser: { token },
  } = useAppSelector((state) => state.authUser);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskInputs>({
    resolver: yupResolver(taskFormSchema),
    defaultValues: { title: props.title, description: props.description },
  });

  const editTaskHandler = ({ title, description }: TaskInputs) => {
    token &&
      dispatch(
        editTask({
          token,
          boardId: props.boardId,
          columnId: props.columnId,
          taskId: props.id,
          order: props.order,
          taskTitle: title,
          userId: props.userId,
          description,
        })
      );
    setIsModalOpened(false);
  };

  const handleCloseModal = () => {
    setIsModalOpened(false);
  };
  return (
    <>
      <Task
        onMouseOver={() => setIsVisibleRemoveBt(true)}
        onMouseOut={() => setIsVisibleRemoveBt(false)}
      >
        <TaskButton
          onClick={() => {
            setIsModalOpened(true);
          }}
        >
          <Typography
            sx={{ color: '#181818da', margin: '0px 0px 5px', fontWeight: '500' }}
            variant="subtitle1"
            component="p"
          >
            {props.title.length > 25
              ? props.title.split('').slice(0, 25).join('') + '...'
              : props.title}
          </Typography>
          <Typography
            sx={{ color: '#545454bb', whiteSpace: 'normal' }}
            variant="inherit"
            component="p"
          >
            {props.description}
          </Typography>
        </TaskButton>
        {isVisibleRemoveBt && (
          <DeleteBtn
            size="small"
            onClick={() => {
              setIsOpenConfirmWindow(true);
            }}
          >
            <DeleteForever fontSize="small" />
          </DeleteBtn>
        )}
      </Task>
      {isModalOpened && (
        <ModalWithForm<TaskInputs>
          titleText={t('EditTask')}
          inputs={getInputs(errors, control)}
          handleSubmit={handleSubmit(editTaskHandler)}
          isModalOpened={isModalOpened}
          handleCloseModal={handleCloseModal}
        />
      )}
      {isOpenConfirmWindow && (
        <ConfirmModal
          isOpen={isOpenConfirmWindow}
          handleSubmit={() => {
            token &&
              dispatch(
                deleteTask({
                  token,
                  boardId: props.boardId,
                  columnId: props.columnId,
                  taskId: props.id,
                })
              );
          }}
          alertText={`${t('DeleteAsk')} "${props.title}" ${t('task')}`}
          closeModal={() => {
            setIsOpenConfirmWindow(false);
            setIsVisibleRemoveBt(false);
          }}
        />
      )}
    </>
  );
};
