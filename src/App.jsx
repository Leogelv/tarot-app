import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import CardLibrary from './pages/CardLibrary';
import CardDetail from './pages/CardDetail';
import DailyCard from './pages/DailyCard';
import Spreads from './pages/Spreads';
import SpreadDetails from './pages/SpreadDetails';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Login from './pages/Login';
import About from './pages/About';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="cards" element={<CardLibrary />} />
        <Route path="cards/:id" element={<CardDetail />} />
        <Route path="daily-card" element={<DailyCard />} />
        <Route path="spreads" element={<Spreads />} />
        <Route path="spreads/:id" element={<SpreadDetails />} />
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
