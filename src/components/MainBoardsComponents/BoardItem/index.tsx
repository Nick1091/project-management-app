import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { deleteBoard } from '../../../requests';
import { ConfirmModal } from '../../ConfirmModal';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { DeleteButton } from '../../DeleteButton';
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

  return (
    <Board
      onMouseOver={() => setIsVisibleRemoveBtn(true)}
      onMouseOut={() => setIsVisibleRemoveBtn(false)}
    >
      <BoardLink to={'/main/board/' + id}>
        <Title>{title}</Title>
        <Description>{description}</Description>
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
