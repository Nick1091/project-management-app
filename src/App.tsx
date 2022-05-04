import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { Board } from './pages/Board';
import { MainBoards } from './pages/MainBoards';
import { Welcome } from './pages/Welcome';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Welcome />} />
        <Route path="/main" element={<MainBoards />} />
        <Route path="/board" element={<Board />} />
      </Route>
    </Routes>
  );
}

export default App;
