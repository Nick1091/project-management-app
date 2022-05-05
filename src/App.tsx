import { Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { Board } from './pages/Board';
import { EditProfile } from './pages/EditProfile';
import { MainBoards } from './pages/MainBoards';
import { NotFound } from './pages/NotFound';
import { Welcome } from './pages/Welcome';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Welcome />} />
        <Route path="/main" element={<MainBoards />} />
        <Route path="/board" element={<Board />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
