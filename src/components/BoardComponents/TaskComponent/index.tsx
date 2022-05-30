import { yupResolver } from '@hookform/resolvers/yup';
import { Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDrag, useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { Preloader } from '../../Preloader';
import { editTask, deleteTask } from '../../../requests';
import { PropsTask, TaskInput } from '../../../types';
import { taskFormSchema } from '../../../validation';
import { ConfirmModal } from '../../ConfirmModal';
import { ModalWithForm } from '../../ModalWithForm';
import { getInputs } from '../ColumnComponent/inputsOptions';
import { DeleteButton } from '../../DeleteButton';
import { setDeletingTaskId } from '../../../store/boardSlice';
import { DeleteBtn, Task, TaskButton } from './styled';

export const TaskContainer = (props: PropsTask) => {
  const { t } = useTranslation(['task']);

  const findTask = props.findTask;
  const moveTask = props.moveTask;
  const originalColumnIndex = findTask(props.columnId, props.id)?.columnIndex;
  const originalTaskIndex = findTask(props.columnId, props.id)?.taskIndex;
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isVisibleRemoveBt, setIsVisibleRemoveBt] = useState(false);
  const [isOpenConfirmWindow, setIsOpenConfirmWindow] = useState(false);

  const dispatch = useAppDispatch();

  const {
    authUser: { token },
  } = useAppSelector((state) => state.authUser);
  const { deletingTaskId, isDeletingTask } = useAppSelector((state) => state.boardState);

  const [{ isDraggingTask }, dragTask] = useDrag(() => ({
    type: 'task',
    item: { taskId: props.id, columnId: props.columnId, originalColumnIndex, originalTaskIndex },
    collect: (monitor) => ({
      isDraggingTask: !!monitor.isDragging(),
    }),
    end: (dropResult, monitor) => {
      const { taskId, columnId, originalColumnIndex, originalTaskIndex } = monitor.getItem();
      const didDrop = monitor.didDrop();
      if (!didDrop && originalTaskIndex !== undefined && originalColumnIndex !== undefined) {
        moveTask(
          taskId,
          columnId,
          originalColumnIndex,
          originalTaskIndex,
          props.columnId,
          props.id
        );
      }
    },
  }));

  const [{ isOver }, dropTask] = useDrop({
    accept: 'task',
    hover({ taskId, columnId }: { taskId: string; columnId: string }) {
      if (taskId !== props.id) {
        const columnTaskData = findTask(props.columnId, props.id);
        if (columnTaskData) {
          moveTask(
            taskId,
            columnId,
            columnTaskData.columnIndex,
            columnTaskData.taskIndex,
            props.columnId,
            props.id
          );
        }
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop: ({ taskId, columnId }: { taskId: string; columnId: string }) => {
      const columnTaskData = findTask(props.columnId, props.id);
      if (columnTaskData) {
        moveTask(
          taskId,
          columnId,
          columnTaskData.columnIndex,
          columnTaskData.taskIndex,
          props.columnId
        );
      }
    },
    canDrop: (item) => item.taskId === props.id,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskInput>({
    resolver: yupResolver(taskFormSchema),
    defaultValues: { title: props.title, description: props.description },
  });

  const editTaskHandler = ({ title, description }: TaskInput) => {
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
        isOver={isOver}
        isDraggingTask={isDraggingTask}
        ref={(node) => dragTask(dropTask(node))}
        onMouseOver={() => setIsVisibleRemoveBt(true)}
        onMouseOut={() => setIsVisibleRemoveBt(false)}
      >
        <TaskButton
          onClick={() => {
            setIsModalOpened(true);
          }}
        >
          {deletingTaskId === props.id && isDeletingTask ? (
            <Preloader />
          ) : (
            <>
              <Typography
                sx={{
                  color: !isOver && !isDraggingTask ? '#181818da' : 'transparent',
                  marginBottom: '4px',
                  fontWeight: '500',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitBoxOrient: 'vertical',
                  display: '-webkit-box',
                  WebkitLineClamp: '2',
                  lineHeight: '1.4',
                }}
                variant="subtitle1"
                component="p"
              >
                {props.title}
              </Typography>
              <Typography
                sx={{
                  color: !isOver && !isDraggingTask ? '#545454bb' : 'transparent',
                  whiteSpace: 'normal',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitBoxOrient: 'vertical',
                  display: '-webkit-box',
                  WebkitLineClamp: '3',
                }}
                variant="inherit"
                component="p"
              >
                {props.description}
              </Typography>
            </>
          )}
        </TaskButton>
        {isVisibleRemoveBt && (
          <DeleteBtn>
            <DeleteButton handleClick={() => setIsOpenConfirmWindow(true)} />
          </DeleteBtn>
        )}
      </Task>
      {isModalOpened && (
        <ModalWithForm<TaskInput>
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

            dispatch(setDeletingTaskId(props.id));
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
