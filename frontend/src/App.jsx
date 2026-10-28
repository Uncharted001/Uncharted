import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Quiz from './components/Quiz';
import Features from './components/Features';
import CTA from './components/CTA';
import Footer from './components/Footer';
import { LoginPage, SignupPage } from './pages/AuthPages';

/* ─── Landing / home page ──────────────────────────────────────────────────── */
function HomePage() {
  const [quizRecommendation, setQuizRecommendation] = useState('');

  const scrollToQuiz = () => {
    const quizSection = document.getElementById('career-quiz');
    if (quizSection) {
      quizSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuizComplete = (recommendation) => {
    setQuizRecommendation(recommendation);
  };

  return (
    <div className="min-h-screen bg-background dark:bg-deep-indigo text-on-surface dark:text-surface-white font-body-md transition-colors duration-300">
      <Header onStartQuiz={scrollToQuiz} />
      <main className="pt-20">
        <Hero onStartQuiz={scrollToQuiz} />
        <Quiz onQuizComplete={handleQuizComplete} />
        <Features />
        <CTA quizRecommendation={quizRecommendation} />
      </main>
      <Footer />
    </div>
  );
}

/* ─── App root ─────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
