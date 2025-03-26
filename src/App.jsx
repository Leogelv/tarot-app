import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import CardLibrary from './pages/CardLibrary';
import CardDetails from './pages/CardDetails';
import DailyCard from './pages/DailyCard';
import Spreads from './pages/Spreads';
import SpreadDetails from './pages/SpreadDetails';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Login from './pages/Login';
import About from './pages/About';
import { fetchCurrentUser } from './store/slices/authSlice';

// Защищенный маршрут - редиректит на логин, если не авторизован
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, status } = useSelector(state => state.auth);
  
  // Если все еще проверяем аутентификацию, показываем загрузку
  if (status === 'loading') {
    return <div className="loading-container">Загрузка...</div>;
  }
  
  // Если не авторизован - редирект на логин
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Если авторизован - показываем запрошенный компонент
  return children;
};

const App = () => {
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.auth);
  
  useEffect(() => {
    // При загрузке приложения проверяем авторизацию
    if (status === 'idle') {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, status]);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="cards" element={<CardLibrary />} />
          <Route path="cards/:cardId" element={<CardDetails />} />
          <Route path="daily" element={<DailyCard />} />
          <Route path="spreads" element={<Spreads />} />
          <Route path="spreads/:spreadId" element={<SpreadDetails />} />
          <Route path="profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
