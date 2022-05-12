import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { i18n } = useTranslation();
  const {
    authUser: { token },
  } = useAppSelector((state) => state.authUser);

  useEffect(() => {
    const lang = localStorage.getItem('i18nextLng');
    i18n.changeLanguage(lang ? lang : 'en');
    const tokenStor = localStorage.getItem('token');
    tokenStor && dispatch(setToken(tokenStor));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    token && localStorage.setItem('token', token);
  }, [token]);

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Welcome />} />
        <Route path="/main" element={<MainBoards />} />
        <Route
          path="/login"
          element={token ? <Navigate to="/main" state={{ from: location }} /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/main" state={{ from: location }} /> : <RegisterPage />}
        />
        <Route path="/board" element={<Board />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
