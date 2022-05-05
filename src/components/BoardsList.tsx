import React, { useEffect, useState } from 'react';
import { createBoard, getBoards } from '../requests/requests';
import { BoardData } from '../types/types';
import { CreateNewBoard } from './CreateNewBoard';

export const BoardsList = () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YjlkODY1Yi1jOTliLTQwYmUtYWEzYi1iZmYzMWI4Mzc4YzgiLCJsb2dpbiI6Imlnb3JhIiwiaWF0IjoxNjUxNzU5NjU1fQ.DNPxTN4FcbK6kQvZ-pavNBtUc-ayHUkedDLqVC_zevY';
  const [boards, setBoards] = useState<BoardData[]>([]);

  useEffect(() => {
    (async () => {
      const newBoards = await getBoards(token);
      setBoards(newBoards);
    })();
  }, []);

  return (
    <>
      <CreateNewBoard
        handleClick={(title) =>
          createBoard(token, title).then((board) => setBoards((prevState) => [...prevState, board]))
        }
      />
      <div>
        {boards.map((board) => (
          <div key={board.id}>{board.title}</div>
        ))}
      </div>
    </>
  );
};
