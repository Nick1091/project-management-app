import { useState } from 'react';
import styled from 'styled-components';
import { styled as styles } from '@mui/material/styles';
import { DeleteForever } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { styledBoard } from '../../styles/styledBoard';
import { ConfirmModal } from '../ConfirmModal';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { deleteBoard } from '../../store/boardsSlice';
import { token } from '../../config/config';

const Board = styled.li`
  ${styledBoard};
  position: relative;
  & span {
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 2;
  }
`;

const BoardLink = styled(NavLink)`
  width: 100%;
  height: 100%;
  text-decoration: none;
  display: block;
  padding: 8px;
  color: #111111;
`;

const DeleteBtn = styles(IconButton)`
  position: absolute;
  right: 4px;
  top: 4px;
`;

export const BoardItem = ({ title, id }: { title: string; id: string }) => {
  const [isVisibleRemoveBtn, setIsVisibleRemoveBtn] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Board
      onMouseOver={() => setIsVisibleRemoveBtn(true)}
      onMouseOut={() => setIsVisibleRemoveBtn(false)}
    >
      <BoardLink to={'/board/' + id}>
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
          handleSubmit={() => dispatch(deleteBoard({ token, id }))}
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
