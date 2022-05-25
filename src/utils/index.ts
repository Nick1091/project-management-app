import { ColumnState } from '../types';

export const sortArray = <T extends { order: number }>(array: T[]) => {
  return [...array].sort((columnA, columnB) => columnA.order - columnB.order);
};

export const getBiggestListOrder = (columnsList: ColumnState[]) => {
  return columnsList.reduce(
    (biggestOrder, column) => (biggestOrder > column.order ? biggestOrder : column.order),
    0
  );
};
