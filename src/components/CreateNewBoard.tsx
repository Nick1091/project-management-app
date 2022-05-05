import React, { useState } from 'react';

export const CreateNewBoard = ({ handleClick }: { handleClick: (value: string) => void }) => {
  const [boardTitle, setBoardTitle] = useState('');
  return (
    <div>
      <input type="text" value={boardTitle} onChange={(e) => setBoardTitle(e.target.value)} />
      <button onClick={() => handleClick(boardTitle)}>Create New Board</button>
    </div>
  );
};
