import { DragEvent } from 'react';
import { ColumnState } from '../types';

export const updateGrabbedColumn = (e: DragEvent<HTMLLIElement>, action: 'add' | 'remove') => {
  const targetColumn = e.target;
  if (targetColumn instanceof HTMLElement && targetColumn.classList.contains('column-container')) {
    targetColumn.classList[action]('active');
  } else {
    if (targetColumn instanceof HTMLLIElement) {
      const columnTargetContainer = targetColumn.firstChild;
      if (columnTargetContainer && columnTargetContainer instanceof HTMLElement)
        columnTargetContainer.classList[action]('active');
    }
  }
};

export const getBiggestListOrder = (columnsList: ColumnState[]) => {
  return columnsList.reduce(
    (biggestOrder, column) => (biggestOrder > column.order ? biggestOrder : column.order),
    0
  );
};
