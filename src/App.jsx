import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Импорт компонентов страниц
import Home from './pages/Home';
import CardLibrary from './pages/CardLibrary';
import CardDetail from './pages/CardDetail';
import DailyCard from './pages/DailyCard';
import Spreads from './pages/Spreads';
import SpreadDetail from './pages/SpreadDetail';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import NotFound from './pages/NotFound';
import MainLayout from './components/layout/MainLayout';

// В режиме демо не проверяем авторизацию
const ProtectedRoute = ({ children }) => {
  // В демо версии все страницы доступны без авторизации
  return children;
};

function App() {
  console.log("App component rendered"); // Отладочный вывод

  return (
    <Routes>
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/cards" element={<MainLayout><CardLibrary /></MainLayout>} />
      <Route path="/cards/:id" element={<MainLayout><CardDetail /></MainLayout>} />
      <Route path="/daily-card" element={<MainLayout><DailyCard /></MainLayout>} />
      <Route path="/spreads" element={<MainLayout><Spreads /></MainLayout>} />
      <Route path="/spreads/:id" element={<MainLayout><SpreadDetail /></MainLayout>} />
      <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
      <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
      <Route path="/register" element={<MainLayout><Register /></MainLayout>} />
      <Route path="/about" element={<MainLayout><About /></MainLayout>} />
      <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
    </Routes>
  );
}

export default App;
