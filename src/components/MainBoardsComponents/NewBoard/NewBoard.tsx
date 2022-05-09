import React from 'react';
import { NewBoardPopover } from '../NewBoardPopover/NewBoardPopover';
import { CreateBoardBtn, CreateBoardWrapper } from './NewBoardStyles';

export const NewBoard = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const isOpenPopover = Boolean(anchorEl);
  let popoverId;
  if (isOpenPopover) popoverId = 'simple-popover';

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
        isOpenPopover={isOpenPopover}
        handleClosePopover={() => setAnchorEl(null)}
      />
    </>
  );
};
