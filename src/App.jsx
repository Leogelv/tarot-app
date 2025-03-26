import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ProfilePage from './pages/Profile';
import CardsPage from './pages/CardLibrary';
import CardDetailsPage from './pages/CardDetails';
import SpreadsPage from './pages/Spreads';
import SpreadDetailsPage from './pages/SpreadDetails';
import DailyCardPage from './pages/DailyCard';
import AboutUsPage from './pages/AboutUs';
import SearchPage from './pages/Search';
import NotFoundPage from './pages/NotFound';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/cards" element={<CardsPage />} />
          <Route path="/cards/:cardId" element={<CardDetailsPage />} />
          <Route path="/spreads" element={<SpreadsPage />} />
          <Route path="/spreads/:spreadId" element={<SpreadDetailsPage />} />
          <Route path="/daily-card" element={<DailyCardPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
