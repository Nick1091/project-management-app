import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { editBoard, getBoardById } from '../../requests';
import { CircularProgress } from '@mui/material';
import styled from 'styled-components';

const Form = styled.form`
  display: ${(props: { isTitleHidden: boolean }) =>
    props.isTitleHidden ? 'inline-block' : 'none'};
`;
const Title = styled.h1`
  display: ${(props: { isTitleHidden: boolean }) =>
    props.isTitleHidden ? 'none' : 'inline-block'};
`;

export const Board = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const {
    authUser: { token },
  } = useAppSelector((state) => state.authUser);
  const [isTitleHidden, setIsTitleHidden] = useState(false);
  const { boardTitle, columns, isLoading, error } = useAppSelector((state) => state.boardState);
  const [inputTitleValue, setInputTitleValue] = useState(boardTitle);
  const [newTitle, setNewTitle] = useState(boardTitle);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (token && id) dispatch(getBoardById({ token, id }));
  }, [dispatch, token, id]);

  useEffect(() => {
    setInputTitleValue(boardTitle);
    setNewTitle(boardTitle);
    console.log('update');
  }, [boardTitle]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [isTitleHidden]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitleValue(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (token && id) dispatch(editBoard({ token, id, title: inputTitleValue }));
    setIsTitleHidden(false);
  };
  const handleBlur = (e: React.FocusEvent<HTMLFormElement>) => {
    const relatedTarget: Element | null = e.relatedTarget;
    if (!e.currentTarget.contains(relatedTarget)) {
      setIsTitleHidden(false);
      setInputTitleValue(newTitle);
    }
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <h3>{error}</h3>;

  return (
    <>
      <div>
        <Title isTitleHidden={isTitleHidden} onClick={() => setIsTitleHidden(true)}>
          {newTitle}
        </Title>
        <Form onSubmit={handleSubmit} onBlur={handleBlur} isTitleHidden={isTitleHidden}>
          <input ref={inputRef} value={inputTitleValue} onChange={handleChange} />
          <button
            type="button"
            onClick={() => {
              setIsTitleHidden(false);
              setInputTitleValue(newTitle);
            }}
          >
            Cancel
          </button>
          <button type="submit">Submit</button>
        </Form>
      </div>
      {columns.length > 0 && (
        <div>
          {columns.map((column) => (
            <div key={column.id}>{column.title}</div>
          ))}
        </div>
      )}
    </>
  );
};
