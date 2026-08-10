import React, { useState, useEffect } from 'react';

export default function Header({ onStartQuiz }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize theme based on preference or system settings
  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 w-full z-50 glassmorphism border-b border-surface-container-highest dark:border-white/10 shadow-sm h-20 transition-all duration-300">
        <div className="max-w-container-max mx-auto h-full flex justify-between items-center px-margin-mobile md:px-margin-desktop">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="font-display-lg text-title-md font-bold text-deep-indigo dark:text-surface-white tracking-tight flex items-center">
              UnCharted
              <span className="material-symbols-outlined ml-1 text-coral-pulse animate-pulse">arrow_forward_ios</span>
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <a className="font-title-md text-label-md text-primary dark:text-coral-pulse font-bold border-b-2 border-coral-pulse pb-1" href="#career-quiz">
              Career Path
            </a>
            <a className="font-title-md text-label-md text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-coral-pulse transition-colors duration-200" href="#how-it-works">
              Degrees
            </a>
            <a className="font-title-md text-label-md text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-coral-pulse transition-colors duration-200" href="#how-it-works">
              Community
            </a>
            <a className="font-title-md text-label-md text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-coral-pulse transition-colors duration-200" href="#cta-section">
              Success Stories
            </a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl bg-surface-container dark:bg-white/10 flex items-center justify-center text-deep-indigo dark:text-surface-white hover:scale-105 active:scale-95 transition-all"
              aria-label="Toggle Theme"
            >
              <span className="material-symbols-outlined">
                {isDarkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {/* Desktop Action */}
            <a className="hidden md:block font-label-md text-label-md text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors duration-200 mr-2" href="#">
              Log In
            </a>

            <button
              onClick={onStartQuiz}
              className="sunrise-gradient text-on-primary font-label-md text-label-md px-5 py-2.5 md:px-6 md:py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2 group hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Take Free Quiz</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>

            {/* Hamburger Menu (Mobile) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="block md:hidden w-10 h-10 rounded-xl bg-surface-container dark:bg-white/10 flex items-center justify-center text-deep-indigo dark:text-surface-white"
              aria-label="Toggle Mobile Menu"
            >
              <span className="material-symbols-outlined">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-deep-indigo/40 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div className={`fixed top-20 right-0 h-[calc(100vh-80px)] w-72 bg-surface-white dark:bg-deep-indigo z-40 border-l border-surface-container-highest dark:border-white/10 shadow-2xl p-6 transform transition-transform duration-300 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col gap-6 h-full justify-between">
          <div className="flex flex-col gap-5">
            <span className="text-xs uppercase tracking-wider text-on-surface-variant dark:text-surface-variant/60 font-bold mb-2">Navigation</span>
            <a
              className="font-title-md text-lg text-primary dark:text-coral-pulse font-semibold"
              href="#career-quiz"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Career Path
            </a>
            <a
              className="font-title-md text-lg text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors"
              href="#how-it-works"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Degrees
            </a>
            <a
              className="font-title-md text-lg text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors"
              href="#how-it-works"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Community
            </a>
            <a
              className="font-title-md text-lg text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors"
              href="#cta-section"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Success Stories
            </a>
          </div>

          <div className="flex flex-col gap-4 border-t border-surface-container-highest dark:border-white/10 pt-6 mb-10">
            <a className="font-label-md text-label-md text-center py-3 text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors duration-200" href="#">
              Log In
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onStartQuiz();
              }}
              className="sunrise-gradient text-on-primary font-label-md text-label-md py-3.5 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Take Free Quiz</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
