import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Quiz from './components/Quiz';
import Features from './components/Features';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
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
      {/* Top Navbar */}
      <Header onStartQuiz={scrollToQuiz} />

      {/* Main Content Layout */}
      <main className="pt-20">
        {/* Hero Section */}
        <Hero onStartQuiz={scrollToQuiz} />

        {/* Interactive Quiz Section */}
        <Quiz onQuizComplete={handleQuizComplete} />

        {/* How it Works / Features Section */}
        <Features />

        {/* CTA & Micro-results Section */}
        <CTA quizRecommendation={quizRecommendation} />
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default App;
