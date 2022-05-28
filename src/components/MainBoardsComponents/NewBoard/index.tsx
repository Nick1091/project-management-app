import React from 'react';
import { useTranslation } from 'react-i18next';
import { NewBoardPopover } from '../NewBoardPopover';
import { CreateBoardBtn, CreateBoardWrapper } from './styled';

export const NewBoard = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const { t } = useTranslation(['common']);
  const isPopoverOpened = Boolean(anchorEl);
  const popoverId = isPopoverOpened ? 'simple-popover' : undefined;

  const handlePopoverClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <CreateBoardWrapper aria-describedby={popoverId} onClick={handlePopoverClick}>
        <CreateBoardBtn>{t('CreateNewBoard')}</CreateBoardBtn>
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
