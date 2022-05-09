import React from 'react';
import { NewBoardForm } from '../NewBoardForm/NewBoardForm';
import { CreateBoardPopover } from './NewBoardPopoverStyles';

type NewBoardPopoverProps = {
  isOpenPopover: boolean;
  popoverElement: HTMLElement | null;
  handleClosePopover: () => void;
  popoverId?: string;
};

export const NewBoardPopover = ({
  handleClosePopover,
  isOpenPopover,
  popoverElement,
  popoverId,
}: NewBoardPopoverProps) => {
  return (
    <CreateBoardPopover
      id={popoverId}
      open={isOpenPopover}
      anchorEl={popoverElement}
      onClose={handleClosePopover}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'right',
      }}
    >
      <NewBoardForm handleClosePopover={handleClosePopover} />
    </CreateBoardPopover>
  );
};
