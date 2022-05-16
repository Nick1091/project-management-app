import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { useAppDispatch, useAppSelector } from './hooks';
import { Board } from './pages/Board';
import { EditProfile } from './pages/EditProfile';
import { LoginPage } from './pages/LoginPage';
import { MainBoards } from './pages/MainBoards';
import { NotFound } from './pages/NotFound';
import { RegisterPage } from './pages/RegisterPage';
import { Welcome } from './pages/Welcome';
import { setToken } from './store/authSlice';

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.authUser.authUser.token);
  const [newToken, setNewToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const tokenStor = localStorage.getItem('token');
    if (tokenStor) {
      dispatch(setToken(tokenStor));
      setNewToken(tokenStor);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      setNewToken(token);
    }
  }, [token]);

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Welcome />} />
        <Route
          path="/main"
          element={newToken ? <MainBoards /> : <Navigate to="/" state={{ from: location }} />}
        />
        <Route
          path="/login"
          element={newToken ? <Navigate to="/main" state={{ from: location }} /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={newToken ? <Navigate to="/main" state={{ from: location }} /> : <RegisterPage />}
        />
        <Route path="/main/board/:id" element={<Board />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
