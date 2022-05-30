import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Box } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Cancel as CancelIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setDeletingColumnId } from '../../../store/boardSlice';
import { ItemTypes } from '../../../constants';
import { Preloader } from '../../Preloader';
import { createTask, deleteBoardColumn, editBoardColumn } from '../../../requests';
import { ColumnInputs, ColumnItemProps, TaskInput } from '../../../types';
import { taskFormSchema, columnFormSchema } from '../../../validation';
import { ConfirmModal } from '../../ConfirmModal';
import { DeleteButton } from '../../DeleteButton';
import { ErrorMessage } from '../../ErrorMessage';
import { sortArray } from '../../../utils';
import { ModalWithForm } from '../../ModalWithForm';
import { TaskContainer } from '../TaskComponent';
import { getInputs } from './inputsOptions';
import {
  ColumnContainer,
  DeleteButtonContainer,
  ColumnListItem,
  ColumnTitle,
  ContainerTask,
  CreateTask,
  ColumnTitleInput,
  EditColumnForm,
  StyledSubmitButton,
  ActionsContainer,
} from './styled';

export const ColumnOfBoard = ({
  moveTask,
  findTask,
  moveColumn,
  findColumn,
  isSortArray,
  column,
  token,
  boardId,
}: ColumnItemProps) => {
  const [isVisibleRemoveBtn, setIsVisibleRemoveBtn] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const { title, tasks, id, order } = column;
  const { t } = useTranslation(['task']);
  const dispatch = useAppDispatch();
  const originalIndex = findColumn(id)?.index;

  const { authUser } = useAppSelector((state) => state.authUser);
  const { deletingColumnId, isDeletingColumn, isCreatingTask } = useAppSelector(
    (state) => state.boardState
  );
  const userId = authUser.id;
  const [isModalOpened, setIsModalOpened] = useState(false);

  const handleDeleteColumn = () => {
    if (token) dispatch(deleteBoardColumn({ token, boardId, columnId: id }));
    dispatch(setDeletingColumnId(id));
  };

  const { columns } = useAppSelector((state) => state.boardState);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.COLUMN,
    item: { id, originalIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (dropResult, monitor) => {
      const { id: droppedId, originalIndex } = monitor.getItem();
      const didDrop = monitor.didDrop();
      if (!didDrop && originalIndex !== undefined) {
        moveColumn(droppedId, originalIndex, id);
      }
      const columnData = findColumn(droppedId);
      if (
        didDrop &&
        originalIndex !== undefined &&
        columnData &&
        columnData.index !== originalIndex
      ) {
        moveColumn(droppedId, columnData.index);
      }
    },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.COLUMN,
    canDrop: () => false,
    hover({ id: draggedId }: { id: string; originalIndex: number | undefined }) {
      if (draggedId !== id) {
        const columnData = findColumn(id);
        if (columnData) moveColumn(draggedId, columnData.index, id);
      }
    },
  });

  const [, dropContainerTask] = useDrop({
    accept: 'task',
    hover({ taskId, columnId }: { taskId: string; columnId: string }) {
      if (columnId !== id && (column.tasks === undefined || column.tasks.length === 0)) {
        if (columns) {
          const columnIndex = sortArray(columns).findIndex((column) => column.id === id);
          if (columnIndex !== -1) {
            moveTask(taskId, columnId, columnIndex, 0, id, (Math.random() * 1000).toFixed(0));
          }
        }
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    canDrop: () => false,
  });

  const {
    control: controlTask,
    handleSubmit: handleSubmitTask,
    reset: resetTask,
    formState: { errors: errorsTask },
  } = useForm<TaskInput>({
    resolver: yupResolver(taskFormSchema),
    defaultValues: { title: '', description: '' },
  });

  const {
    control: controlColumn,
    handleSubmit: handleSubmitColumn,
    setValue: setValueColumn,
    formState: { errors: errorsColumn },
  } = useForm<ColumnInputs>({
    resolver: yupResolver(columnFormSchema),
    defaultValues: { title },
  });

  const createTaskHandler = ({ title, description }: TaskInput) => {
    if (token && boardId && id && userId) {
      dispatch(
        createTask({
          token,
          boardId: boardId,
          columnId: id,
          taskTitle: title,
          userId,
          description,
        })
      );
      resetTask();
      setIsModalOpened(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpened(false);
    resetTask();
  };

  const [isTitleInput, setIsTitleInput] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState(title);
  const columnSubmitHandler = (formState: ColumnInputs) => {
    if (formState.title !== newColumnTitle) {
      setNewColumnTitle(formState.title);
      if (token && id)
        dispatch(
          editBoardColumn({
            token,
            boardId,
            columnId: id,
            columnTitle: formState.title,
            columnOrder: order,
          })
        );
    }
    setIsTitleInput(false);
  };

  return (
    <ColumnListItem
      ref={(node) => {
        drop(node);
      }}
    >
      <ColumnContainer
        onMouseOver={() => setIsVisibleRemoveBtn(!isDragging)}
        onMouseOut={() => setIsVisibleRemoveBtn(false)}
        ref={(node) => drag(drop(node))}
      >
        {deletingColumnId === id && isDeletingColumn ? (
          <Preloader color="secondary.main" />
        ) : isTitleInput ? (
          <EditColumnForm onSubmit={handleSubmitColumn(columnSubmitHandler)}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Controller
                render={({ field }) => <ColumnTitleInput {...field} />}
                name="title"
                control={controlColumn}
              />
              <ErrorMessage error={errorsColumn.title} />
            </Box>
            <ActionsContainer>
              <StyledSubmitButton type="submit">
                <CheckCircleIcon sx={{ fontSize: '20px', color: 'success.dark' }} />
              </StyledSubmitButton>
              <CancelIcon
                sx={{ cursor: 'pointer', fontSize: '20px', color: 'error.dark' }}
                onClick={() => {
                  setIsTitleInput(false);
                  setValueColumn('title', newColumnTitle);
                }}
              />
            </ActionsContainer>
          </EditColumnForm>
        ) : (
          <ColumnTitle onClick={() => setIsTitleInput(true)}>{newColumnTitle}</ColumnTitle>
        )}
        <ContainerTask ref={(node) => dropContainerTask(node)}>
          {tasks &&
            (isSortArray ? sortArray(tasks) : tasks).map((task) => (
              <TaskContainer
                moveTask={moveTask}
                findTask={findTask}
                key={task.id}
                {...task}
                boardId={boardId}
                columnId={id}
              />
            ))}
        </ContainerTask>
        <CreateTask onClick={() => setIsModalOpened(true)}>
          {isCreatingTask ? (
            <Preloader color="primary.contrastText" />
          ) : (
            `＋ ${t('add task', { ns: 'task' })}`
          )}
        </CreateTask>
        {isModalOpened && (
          <ModalWithForm<TaskInput>
            titleText={t('Create task')}
            inputs={getInputs(errorsTask, controlTask)}
            handleSubmit={handleSubmitTask(createTaskHandler)}
            isModalOpened={isModalOpened}
            handleCloseModal={handleCloseModal}
          />
        )}
        {isVisibleRemoveBtn && (
          <DeleteButtonContainer>
            <DeleteButton handleClick={() => setIsOpenConfirmModal(true)} />
          </DeleteButtonContainer>
        )}
        {isOpenConfirmModal && (
          <ConfirmModal
            isOpen={isOpenConfirmModal}
            closeModal={() => setIsOpenConfirmModal(false)}
            alertText={`${t('DeleteAsk')} "${title}" ${t('column')}`}
            handleSubmit={handleDeleteColumn}
          />
        )}
      </ColumnContainer>
    </ColumnListItem>
  );
};
