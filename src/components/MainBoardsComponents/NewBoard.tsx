import React from 'react';
import { styled as styles } from '@mui/material/styles';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { styledBoard } from '../../styles/styledBoard';
import { NewBoardPopover } from './NewBoardPopover';

const CreateBoardBtn = styles(Button)`
  padding: 8px;
  width: 100%;
  height: 100%;
`;

const CreateBoardWrapper = styled.li`
  ${styledBoard};
  background-color: #091e420a;
`;

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
