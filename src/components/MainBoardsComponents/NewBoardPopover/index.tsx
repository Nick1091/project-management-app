import React from 'react';
import { NewBoardForm } from '../NewBoardForm';
import { CreateBoardPopover } from './styled';

type NewBoardPopoverProps = {
  isPopoverOpened: boolean;
  popoverElement: HTMLElement | null;
  handleClosePopover: () => void;
  popoverId?: string;
};

export const NewBoardPopover = ({
  handleClosePopover,
  isPopoverOpened,
  popoverElement,
  popoverId,
}: NewBoardPopoverProps) => {
  return (
    <CreateBoardPopover
      id={popoverId}
      open={isPopoverOpened}
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
