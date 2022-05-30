import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDrop } from 'react-dnd';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { ColumnInputs, ModalInputState, ColumnState, TaskState } from '../../../types';
import { columnFormSchema } from '../../../validation';
import { Preloader } from '../../Preloader';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { ItemTypes } from '../../../constants';
import { sortArray } from '../../../utils';
import {
  createBoardColumn,
  getBoardColumns,
  updateBoardColumn,
  updateTask,
} from '../../../requests';
import { ModalWithForm } from '../../ModalWithForm';
import { ColumnOfBoard } from '../ColumnComponent';
import { ColumnListContainer, CreateColumnBtn, ColumnBtn } from './styled';

type ColumnListProps = {
  columns: ColumnState[];
  token: string | null;
  boardId?: string;
};

export const ColumnsList = ({ columns, token, boardId }: ColumnListProps) => {
  const { t } = useTranslation(['common']);
  const dispatch = useAppDispatch();
  const [, drop] = useDrop({ accept: ItemTypes.COLUMN });

  const { isCreatingColumn } = useAppSelector((state) => state.boardState);
  const [columnsList, setColumnsList] = useState(sortArray(columns));
  const [draggedColumn, setDraggedColumn] = useState<undefined | ColumnState>();
  const [isSortArray, setIsTaskList] = useState(true);
  const [draggedTask, setDraggedTask] = useState<undefined | TaskState[]>();
  const [isModalOpened, setIsModalOpened] = useState(false);

  useEffect(() => {
    const temporaryColumnsList: ColumnState[] = columns.map((column) => {
      if (column.tasks) {
        return {
          ...column,
          tasks: sortArray(column.tasks),
        };
      }
      return column;
    });
    setColumnsList(sortArray(temporaryColumnsList));
  }, [columns]);

  const moveColumn = async (id: string, atIndex: number, movedId?: string) => {
    const temporaryColumnsList = [...columnsList];
    const columnData = findColumn(id);
    if (movedId) {
      setDraggedColumn(findColumn(movedId)?.column);
      if (columnData) {
        temporaryColumnsList.splice(columnData.index, 1);
        temporaryColumnsList.splice(atIndex, 0, columnData.column);
      }
      setColumnsList(temporaryColumnsList);
    } else {
      if (columnData && draggedColumn && boardId && token) {
        await dispatch(
          updateBoardColumn({
            token,
            boardId,
            column: { ...columnData.column, order: draggedColumn.order },
          })
        );
        await dispatch(getBoardColumns({ token, id: boardId }));
      }
    }
  };

  const findColumn = (id: string) => {
    const column = columnsList.find((column) => column.id === id);
    if (column)
      return {
        column,
        index: columnsList.indexOf(column),
      };
  };

  const moveTask = async (
    taskId: string,
    columnId: string,
    originalColumnIndex: number,
    originalTaskIndex: number,
    columnCurrentId: string,
    taskCurrentId?: string
  ) => {
    const idxInitTask = 0;
    const idxTargetTask = 1;

    let initColumnTaskData = findTask(columnId, taskId);
    if (taskCurrentId) {
      if (!Number.isNaN(+taskCurrentId)) {
        if (initColumnTaskData) {
          const { column, columnIndex, taskIndex } = initColumnTaskData;
          const initTask = column.tasks[taskIndex];
          const overTask = {
            ...initTask,
            columnId: columnCurrentId,
            order: 1,
            id: (Math.random() * 1000).toFixed(0),
          };
          setDraggedTask([
            { ...initTask, columnId: columnId, order: 1 },
            { ...overTask, columnId: columnCurrentId },
          ]);
          const columnsWithoutCurrentColumn = columnsList.filter(
            (column) => column.id !== columnId
          );
          const currentColumn = columnsList[columnIndex];
          const tasksCurrentArray = [...currentColumn.tasks];
          tasksCurrentArray.splice(taskIndex, 1);
          const columnCurrent = {
            ...currentColumn,
            tasks: [...tasksCurrentArray],
          };
          const columnIndexTarget = columnsList.findIndex(
            (column) => column.id === columnCurrentId
          );
          const targetColumn = { ...columnsList[columnIndexTarget], tasks: [initTask] };
          const neutralColumns = columnsWithoutCurrentColumn.filter(
            (col) => columnCurrentId !== col.id
          );
          setColumnsList(sortArray([columnCurrent, targetColumn, ...neutralColumns]));
          setIsTaskList(false);
        } else {
          if (draggedTask) {
            initColumnTaskData = findTask(draggedTask[idxTargetTask].columnId, taskId);
            if (initColumnTaskData) {
              const { column, columnIndex, taskIndex } = initColumnTaskData;
              const initTask = column.tasks[taskIndex];
              const overTask = {
                ...initTask,
                columnId: columnCurrentId,
                order: 1,
                id: (Math.random() * 1000).toFixed(0),
              };
              setDraggedTask([
                { ...initTask, columnId: columnId, order: 1 },
                { ...overTask, columnId: columnCurrentId },
              ]);
              const columnsWithoutCurrentColumn = columnsList.filter((col) => col.id !== column.id);
              const currentColumn = columnsList[columnIndex];
              const tasksCurrentArray = [...currentColumn.tasks];
              tasksCurrentArray.splice(taskIndex, 1);
              const columnCurrent = {
                ...currentColumn,
                tasks: [...tasksCurrentArray],
              };
              const columnIndexTarget = columnsList.findIndex(
                (column) => column.id === columnCurrentId
              );
              const targetColumn = columnsList[columnIndexTarget];
              const tasksTargetArray = [...targetColumn.tasks];
              tasksTargetArray.splice(originalTaskIndex, 0, initTask);
              const columnTarget = {
                ...targetColumn,
                tasks: [...tasksTargetArray],
              };
              const neutralColumns = columnsWithoutCurrentColumn.filter(
                (col) => columnCurrentId !== col.id
              );
              setColumnsList(sortArray([columnCurrent, columnTarget, ...neutralColumns]));
              setIsTaskList(false);
            }
          }
        }
      } else if (columnId === columnCurrentId) {
        if (initColumnTaskData) {
          const { column, columnIndex, taskIndex } = initColumnTaskData;
          const initTask = column.tasks[taskIndex];
          const overTask = columnsList[originalColumnIndex].tasks[originalTaskIndex];
          setDraggedTask([
            { ...initTask, columnId: columnId, order: overTask.order },
            { ...overTask, columnId: columnCurrentId },
          ]);
          const columnsWithoutCurrentColumn = columnsList.filter(
            (column) => column.id !== columnId
          );
          const targetColumn = columnsList[columnIndex];
          const tasksCurrentArray = [...targetColumn.tasks];
          tasksCurrentArray.splice(taskIndex, 1);
          tasksCurrentArray.splice(originalTaskIndex, 0, initTask);
          const columnCurrent = {
            ...targetColumn,
            tasks: [...tasksCurrentArray],
          };
          setColumnsList(sortArray([...columnsWithoutCurrentColumn, columnCurrent]));
          setIsTaskList(false);
        } else {
          if (draggedTask) {
            initColumnTaskData = findTask(draggedTask[idxTargetTask].columnId, taskId);
            if (initColumnTaskData) {
              const { column, columnIndex, taskIndex } = initColumnTaskData;
              const initTask = column.tasks[taskIndex];
              const overTask = columnsList[originalColumnIndex].tasks[originalTaskIndex];
              setDraggedTask([
                { ...initTask, columnId: columnCurrentId, order: overTask.order },
                { ...overTask, columnId: columnCurrentId, id: initTask.id },
              ]);
              const currentColumn = columnsList[columnIndex];
              const withoutColumnRemove = columnsList.filter((col) => col.id !== column.id);
              const tasksCurrentArray = [...currentColumn.tasks];
              tasksCurrentArray.splice(taskIndex, 1);
              const columnCurrent = {
                ...currentColumn,
                tasks: [...tasksCurrentArray],
              };
              const targetColumn = columnsList[originalColumnIndex];
              const tasksTargetArray = [...targetColumn.tasks];
              tasksTargetArray.splice(originalTaskIndex, 0, initTask);
              const columnTarget = {
                ...targetColumn,
                tasks: [...tasksTargetArray],
              };
              const neutralColumns = withoutColumnRemove.filter((col) => columnId !== col.id);

              setColumnsList(sortArray([columnCurrent, columnTarget, ...neutralColumns]));
              setIsTaskList(false);
            }
          }
        }
      } else {
        if (initColumnTaskData) {
          const { column, columnIndex, taskIndex } = initColumnTaskData;
          const initTask = column.tasks[taskIndex];
          const overTask = columnsList[originalColumnIndex].tasks[originalTaskIndex];
          setDraggedTask([
            {
              ...initTask,
              columnId: columnId,
              order: overTask.order,
            },
            { ...overTask, columnId: columnCurrentId },
          ]);
          const columnsWithoutCurrentColumn = columnsList.filter(
            (column) => column.id !== columnId
          );
          const initColumn = columnsList[columnIndex];
          const currentTasksInColumn = initColumn.tasks.filter((task) => task.id !== taskId);
          const currentColumn = {
            ...initColumn,
            tasks: [...currentTasksInColumn],
          };
          const columnsWithoutTargetAndCurrentColumn = columnsWithoutCurrentColumn.filter(
            (column) => column.id !== columnCurrentId
          );
          const targetTasksInColumn = [...columnsList[originalColumnIndex].tasks];
          targetTasksInColumn.splice(originalTaskIndex, 0, initTask);
          const targetColumn = {
            ...columnsList[originalColumnIndex],
            tasks: [...targetTasksInColumn],
          };
          const columnListWithTarget = sortArray([
            currentColumn,
            targetColumn,
            ...columnsWithoutTargetAndCurrentColumn,
          ]);
          setColumnsList(columnListWithTarget);
          setIsTaskList(false);
        } else {
          if (draggedTask) {
            initColumnTaskData = findTask(draggedTask[idxTargetTask].columnId, taskId);
            if (initColumnTaskData) {
              const { column, columnIndex, taskIndex } = initColumnTaskData;
              const initTask = column.tasks[taskIndex];
              const overTask = columnsList[originalColumnIndex].tasks[originalTaskIndex];
              setDraggedTask([
                {
                  ...initTask,
                  columnId: columnId,
                  order: overTask.order + 1,
                },
                { ...overTask, columnId: columnCurrentId },
              ]);
              const withoutColumnRemove = columnsList.filter((col) => col.id !== column.id);
              const withColumnRemove = columnsList[columnIndex];
              if (columnCurrentId === column.id) {
                const tasksTargetArray = [...withColumnRemove.tasks];
                tasksTargetArray.splice(taskIndex, 1);
                tasksTargetArray.splice(originalTaskIndex, 0, initTask);

                const currentColumn = {
                  ...withColumnRemove,
                  tasks: [...tasksTargetArray],
                };
                setColumnsList(sortArray([currentColumn, ...withoutColumnRemove]));
                setIsTaskList(false);
              } else {
                const tasksCurrentArray = [...withColumnRemove.tasks];
                tasksCurrentArray.splice(taskIndex, 1);
                const currentColumn = {
                  ...withColumnRemove,
                  tasks: [...tasksCurrentArray],
                };
                const targetColumns = columnsList[originalColumnIndex];
                const neutralColumns = withoutColumnRemove.filter(
                  (col) => targetColumns.id !== col.id
                );
                const tasksTargetArray = [...targetColumns.tasks];
                tasksTargetArray.splice(originalTaskIndex, 0, initTask);
                const targetColumn = {
                  ...targetColumns,
                  tasks: [...tasksTargetArray],
                };
                const columnListWithTarget = sortArray([
                  currentColumn,
                  targetColumn,
                  ...neutralColumns,
                ]);
                setColumnsList(columnListWithTarget);
                setIsTaskList(false);
              }
            }
          }
        }
      }
    } else {
      if (draggedTask && boardId && token) {
        const { columnId, id, title, description, userId } = draggedTask[idxInitTask];
        if (draggedTask[idxInitTask].id !== draggedTask[idxTargetTask].id) {
          const task = {
            title: title,
            order: draggedTask[idxInitTask].order,
            description: description,
            userId: userId,
            boardId,
            columnId: draggedTask[idxTargetTask].columnId,
          };
          await dispatch(
            updateTask({
              token,
              boardId,
              columnId,
              taskId: id,
              draggedTask: { ...task },
            })
          );
          setDraggedTask(undefined);
          await dispatch(getBoardColumns({ token, id: boardId }));
        }
      }
    }
  };

  const findTask = (columnId: string, taskId: string) => {
    const column = columnsList.find((column) => column.id === columnId);
    const indexColumn = columnsList.findIndex((column) => column.id === columnId);
    if (indexColumn !== -1) {
      const indexTask = columnsList[indexColumn].tasks.findIndex((task) => task.id === taskId);
      if (column && indexTask !== -1) {
        return {
          column,
          columnIndex: indexColumn,
          taskIndex: indexTask,
        };
      }
    }
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ColumnInputs>({
    resolver: yupResolver(columnFormSchema),
    defaultValues: { title: '' },
  });

  const inputsOptions: ModalInputState<ColumnInputs>[] = [
    {
      textFieldProps: {
        size: 'small',
        id: 'outlined-basic',
        variant: 'outlined',
        error: Boolean(errors.title),
        helperText: errors.title?.message,
      },
      label: 'Column Title',
      name: 'title',
      control,
    },
  ];

  const createColumnHandler = ({ title }: ColumnInputs) => {
    if (token && boardId) dispatch(createBoardColumn({ token, boardId, columnTitle: title }));
    reset();
    setIsModalOpened(false);
  };

  const handleCloseModal = () => {
    setIsModalOpened(false);
    reset();
  };

  return (
    <>
      <ColumnListContainer ref={(node) => drop(node)}>
        {columnsList.length > 0 &&
          columnsList.map(
            (column) =>
              boardId && (
                <ColumnOfBoard
                  moveTask={moveTask}
                  findTask={findTask}
                  moveColumn={moveColumn}
                  findColumn={findColumn}
                  column={column}
                  token={token}
                  boardId={boardId}
                  isSortArray={isSortArray}
                  key={column.id}
                />
              )
          )}
        <ColumnBtn>
          <CreateColumnBtn
            variant="contained"
            sx={{
              backgroundColor: 'primary.light',
              '&:hover': { backgroundColor: 'primary.main' },
            }}
            onClick={() => setIsModalOpened(true)}
          >
            {isCreatingColumn ? <Preloader color="primary.contrastText" /> : t('Create column')}
          </CreateColumnBtn>
        </ColumnBtn>
      </ColumnListContainer>
      {isModalOpened && (
        <ModalWithForm<ColumnInputs>
          titleText={t('Create column')}
          inputs={inputsOptions}
          handleSubmit={handleSubmit(createColumnHandler)}
          isModalOpened={isModalOpened}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};
