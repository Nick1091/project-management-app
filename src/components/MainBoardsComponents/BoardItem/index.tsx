import { useState } from 'react';
import { deleteBoard } from '../../../requests';
import { ConfirmModal } from '../../ConfirmModal';
import { Board, BoardLink, DeleteBtnContainer } from './styled';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { DeleteButton } from '../../DeleteButton';

type BoardItemProps = {
  title: string;
  id: string;
};

export const BoardItem = ({ title, id }: BoardItemProps) => {
  const [isVisibleRemoveBtn, setIsVisibleRemoveBtn] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const dispatch = useAppDispatch();
  const {
    authUser: { token },
  } = useAppSelector((state) => state.authUser);

  return (
    <Board
      onMouseOver={() => setIsVisibleRemoveBtn(true)}
      onMouseOut={() => setIsVisibleRemoveBtn(false)}
    >
      <BoardLink to={'/main/board/' + id}>
        <span>{title}</span>
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
            if (token) dispatch(deleteBoard({ token, id }));
          }}
          alertText={`Do you really want to delete "${title}" board?`}
          closeModal={() => {
            setIsOpenConfirmModal(false);
            setIsVisibleRemoveBtn(false);
          }}
        />
      )}
    </Board>
  );
};
