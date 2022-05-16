import { useState } from 'react';
import { deleteBoard } from '../../../requests';
import { DeleteForever } from '@mui/icons-material';
import { ConfirmModal } from '../../ConfirmModal';
import { Board, BoardLink, DeleteBtn } from './styled';
import { useAppDispatch, useAppSelector } from '../../../hooks';

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
        <DeleteBtn size="small" onClick={() => setIsOpenConfirmModal(true)}>
          <DeleteForever fontSize="small" />
        </DeleteBtn>
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
