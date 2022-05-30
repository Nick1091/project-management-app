import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { createTask, deleteBoardColumn } from '../../../requests';
import { ItemTypes } from '../../../constants';
import { ColumnItemProps, TaskInput } from '../../../types';
import { taskFormSchema } from '../../../validation';
import { ConfirmModal } from '../../ConfirmModal';
import { DeleteButton } from '../../DeleteButton';
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
  const { title, tasks, id } = column;
  const { t } = useTranslation(['task']);
  const dispatch = useAppDispatch();
  const originalIndex = findColumn(id)?.index;

  const { authUser } = useAppSelector((state) => state.authUser);
  const userId = authUser.id;
  const [isModalOpened, setIsModalOpened] = useState(false);

  const handleDeleteColumn = () => {
    if (token) dispatch(deleteBoardColumn({ token, boardId, columnId: id }));
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
        const columnIndex = sortArray(columns).findIndex((column) => column.id === id);
        if (columnIndex !== -1) {
          moveTask(taskId, columnId, columnIndex, 0, id, (Math.random() * 1000).toFixed(0));
        }
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    canDrop: () => false,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskInput>({
    resolver: yupResolver(taskFormSchema),
    defaultValues: { title: '', description: '' },
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
      reset();
      setIsModalOpened(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpened(false);
    reset();
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
        isDragging={isDragging}
        ref={(node) => {
          drag(drop(node));
        }}
      >
        <ColumnTitle>{title}</ColumnTitle>
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
          ＋ {t('add task', { ns: 'task' })}
        </CreateTask>
        {isModalOpened && (
          <ModalWithForm<TaskInput>
            titleText={t('Create task')}
            inputs={getInputs(errors, control)}
            handleSubmit={handleSubmit(createTaskHandler)}
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
