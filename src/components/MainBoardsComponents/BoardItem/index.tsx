import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { deleteBoard } from '../../../requests';
import { setDeletingBoardId } from '../../../store/mainSlice';
import { ConfirmModal } from '../../ConfirmModal';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { DeleteButton } from '../../DeleteButton';
import { Preloader } from '../../Preloader';
import { Board, BoardLink, DeleteBtnContainer, Title, Description } from './styled';

type BoardItemProps = {
  title: string;
  description: string;
  id: string;
};

export const BoardItem = ({ title, description, id }: BoardItemProps) => {
  const [isVisibleRemoveBtn, setIsVisibleRemoveBtn] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const { t } = useTranslation(['task']);
  const dispatch = useAppDispatch();
  const {
    authUser: { token },
  } = useAppSelector((state) => state.authUser);
  const { isDeletingBoard, deletingBoardId } = useAppSelector((state) => state.mainBoards);

  return (
    <Board
      onMouseOver={() => setIsVisibleRemoveBtn(true)}
      onMouseOut={() => setIsVisibleRemoveBtn(false)}
    >
      <BoardLink to={'/main/board/' + id}>
        {deletingBoardId === id && isDeletingBoard ? (
          <Preloader color="secondary.main" />
        ) : (
          <>
            <Title>{title}</Title>
            <Description>{description}</Description>
          </>
        )}
      </BoardLink>
      {isVisibleRemoveBtn && (
        <DeleteBtnContainer>
          <DeleteButton handleClick={() => setIsOpenConfirmModal(true)} />
        </DeleteBtnContainer>
      )}
      {isOpenConfirmModal && (
        <ConfirmModal
          isOpen={isOpenConfirmModal}
          handleSubmit={() => {
            dispatch(setDeletingBoardId(id));
            if (token) dispatch(deleteBoard({ token, id }));
          }}
          alertText={`${t('DeleteAsk')} "${title}" ${t('board')}`}
          closeModal={() => {
            setIsOpenConfirmModal(false);
            setIsVisibleRemoveBtn(false);
          }}
        />
      )}
    </Board>
  );
};
