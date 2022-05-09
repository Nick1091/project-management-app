import React from 'react';
import { NewBoardPopover } from '../NewBoardPopover/NewBoardPopover';
import { CreateBoardBtn, CreateBoardWrapper } from './NewBoardStyles';

export const NewBoard = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const isPopoverOpened = Boolean(anchorEl);
  const popoverId = isPopoverOpened ? 'simple-popover' : undefined;

  const handlePopoverClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <CreateBoardWrapper aria-describedby={popoverId} onClick={handlePopoverClick}>
        <CreateBoardBtn>Create new board</CreateBoardBtn>
      </CreateBoardWrapper>
      <NewBoardPopover
        popoverElement={anchorEl}
        popoverId={popoverId}
        isPopoverOpened={isPopoverOpened}
        handleClosePopover={() => setAnchorEl(null)}
      />
    </>
  );
};
