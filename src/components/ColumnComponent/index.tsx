import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { TaskState } from '../../types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TaskInputs } from '../../types/taskTypes';
import { taskFormSchema } from '../../validation';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { createTask } from '../../requests';
import { ModalWithForm } from '../BoardComponents/ModalWithForm';
import { getInputs } from './inputsOptions';
import { TaskContainer } from '../TaskComponent';
import { ColumnTitle, CreateTask, ColumnContainer } from './styled';
import { ContainerTask } from './styled';

export const ColumnOfBoard = (props: {
  column: { tasks: TaskState[]; title: string; id: string };
}) => {
  const { t } = useTranslation(['task']);
  const { id } = useParams();
  const boardId = id ?? '';
  const columnId = props.column.id;
  const dispatch = useAppDispatch();
  const {
    authUser,
    authUser: { token },
  } = useAppSelector((state) => state.authUser);

  const userId = authUser.id;
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [taskOrder, setTaskOrder] = useState(0);
  const additionNumNextTaskOrder = 1;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskInputs>({
    resolver: yupResolver(taskFormSchema),
    defaultValues: { title: '', description: '' },
  });

  useEffect(() => {
    const topTaskOrder = props.column.tasks
      ? props.column.tasks.reduce(
          (biggestOrder, task) => (biggestOrder > task.order ? biggestOrder : task.order),
          0
        )
      : 0;
    setTaskOrder(topTaskOrder + additionNumNextTaskOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createTaskHandler = ({ title, description }: TaskInputs) => {
    if (token && boardId && props.column.id && userId) {
      dispatch(
        createTask({
          token,
          boardId: boardId,
          columnId: props.column.id,
          taskTitle: title,
          order: taskOrder,
          userId,
          description,
        })
      );
      setTaskOrder((prevNumber) => (prevNumber = prevNumber + additionNumNextTaskOrder));
      reset();
      setIsModalOpened(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpened(false);
    reset();
  };
  return (
    <div>
      <ColumnContainer>
        <ColumnTitle>{props.column.title}</ColumnTitle>
        {props.column.tasks && (
          <>
            <ContainerTask>
              {[...props.column.tasks]
                .sort((taskA, taskB) => taskA.order - taskB.order)
                .map((task) => (
                  <TaskContainer key={task.id} {...task} columnId={columnId} boardId={boardId} />
                ))}
            </ContainerTask>
          </>
        )}
        <CreateTask onClick={() => setIsModalOpened(true)}>
          ＋ {t('add task', { ns: 'task' })}
        </CreateTask>
      </ColumnContainer>
      {isModalOpened && (
        <ModalWithForm<TaskInputs>
          titleText={t('Create task')}
          inputs={getInputs(errors, control)}
          handleSubmit={handleSubmit(createTaskHandler)}
          isModalOpened={isModalOpened}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};
