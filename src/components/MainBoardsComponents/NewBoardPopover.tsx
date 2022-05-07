import React from 'react';
import { styled as styles } from '@mui/material/styles';
import { Popover } from '@mui/material';
import { NewBoardForm } from './NewBoardForm';

const CreateBoardPopover = styles(Popover)`
  & .MuiPaper-root {
    max-width: 400px;
    width: 50%;
  }
`;

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
