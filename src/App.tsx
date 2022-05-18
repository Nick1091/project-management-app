import { useEffect, useState } from 'react';
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
import { getUserId } from './requests';
import { setUserCredentials } from './store/authSlice';

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [newToken, setNewToken] = useState(localStorage.getItem('token'));
  const { i18n } = useTranslation();

  const {
    authUser: { token, login },
  } = useAppSelector((state) => state.authUser);

  useEffect(() => {
    const lang = localStorage.getItem('i18nextLng');
    i18n.changeLanguage(lang ? lang : 'en');
    const token = localStorage.getItem('token');
    const login = localStorage.getItem('login');
    if (token && login) {
      dispatch(setUserCredentials({ token, login }));
      setNewToken(token);
    } else {
      setNewToken(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      dispatch(getUserId(token));
      setNewToken(token);
    } else {
      setNewToken(null);
    }
    if (login) {
      localStorage.setItem('login', login);
    }
  }, [token, login, dispatch]);

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route
          index
          element={!newToken ? <Welcome /> : <Navigate to="/main" state={{ from: location }} />}
        />
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
        <Route
          path="/edit-profile"
          element={!token ? <Navigate to="/" state={{ from: location }} /> : <EditProfile />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
