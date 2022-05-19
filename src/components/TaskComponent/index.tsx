import { yupResolver } from '@hookform/resolvers/yup';
import { Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DeleteForever } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { editTask, deleteTask } from '../../requests';
import { TaskInputs, TaskState } from '../../types';
import { taskFormSchema } from '../../validation';
import { ModalWithForm } from '../BoardComponents/ModalWithForm';
import { ConfirmModal } from '../ConfirmModal';
import { getInputs } from '../ColumnComponent/inputsOptions';
import { DeleteBtn, Task, TaskButton } from './styled';

export const TaskContainer = (props: TaskState) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isVisibleRemoveBtn, setIsVisibleRemoveBtn] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
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
          taskTitle: title,
          order: props.order,
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
        onMouseOver={() => setIsVisibleRemoveBtn(true)}
        onMouseOut={() => setIsVisibleRemoveBtn(false)}
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
        {isVisibleRemoveBtn && (
          <DeleteBtn
            size="small"
            onClick={() => {
              setIsOpenConfirmModal(true);
            }}
          >
            <DeleteForever fontSize="small" />
          </DeleteBtn>
        )}
      </Task>
      {isModalOpened && (
        <ModalWithForm<TaskInputs>
          titleText="Edit task"
          inputs={getInputs(errors, control)}
          handleSubmit={handleSubmit(editTaskHandler)}
          isModalOpened={isModalOpened}
          handleCloseModal={handleCloseModal}
        />
      )}
      {isOpenConfirmModal && (
        <ConfirmModal
          isOpen={isOpenConfirmModal}
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
          alertText={`Do you really want to delete "${props.title}" task?`}
          closeModal={() => {
            setIsOpenConfirmModal(false);
            setIsVisibleRemoveBtn(false);
          }}
        />
      )}
    </>
  );
};
