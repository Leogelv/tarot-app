import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import MainLayout from './components/layout/MainLayout';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import CardLibrary from './pages/CardLibrary';
import CardDetail from './pages/CardDetail';
import DailyCard from './pages/DailyCard';
import Spreads from './pages/Spreads';
import SpreadDetail from './pages/SpreadDetail';
import Profile from './pages/Profile';
import ReadingDetail from './pages/ReadingDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="cards" element={<CardLibrary />} />
        <Route path="cards/:id" element={<CardDetail />} />
        <Route path="daily-card" element={<DailyCard />} />
        <Route path="spreads" element={<Spreads />} />
        <Route path="spreads/:id" element={<SpreadDetail />} />
        <Route path="profile" element={<Profile />} />
        <Route path="readings/:id" element={<ReadingDetail />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
