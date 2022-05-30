import React from 'react';
import { useAppSelector } from '../../../hooks';
import { useTranslation } from 'react-i18next';
import { NewBoardPopover } from '../NewBoardPopover';
import { Preloader } from '../../Preloader';
import { CreateBoardBtn, CreateBoardWrapper } from './styled';

export const NewBoard = () => {
  const { isCreatingBoard } = useAppSelector((state) => state.mainBoards);
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
        {isCreatingBoard ? (
          <Preloader color="#fafafa" />
        ) : (
          <CreateBoardBtn>{t('CreateNewBoard')}</CreateBoardBtn>
        )}
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
