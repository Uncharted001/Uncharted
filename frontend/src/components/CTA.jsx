import React, { useState, useEffect } from 'react';

export default function CTA({ quizRecommendation }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Auto-populate or highlight if quiz is taken
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    if (quizRecommendation) {
      setSelectedTag(quizRecommendation);
    }
  }, [quizRecommendation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setIsSubmitted(true);
  };

  const careerTags = [
    { name: 'UX Designer', color: 'bg-coral-pulse/20 text-primary-fixed border border-coral-pulse/30' },
    { name: 'Growth Hacker', color: 'bg-amber-glow/20 text-secondary-fixed border border-amber-glow/30' },
    { name: 'Creative Strategist', color: 'bg-tertiary/40 text-tertiary-fixed border border-tertiary/50' },
    { name: 'Full-Stack Engineer', color: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' },
    { name: 'Product Manager', color: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' }
  ];

  return (
    <section id="cta-section" className="bg-deep-indigo dark:bg-black/40 py-20 px-margin-mobile md:px-margin-desktop text-surface-white relative overflow-hidden transition-colors duration-300">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[450px] h-[450px] bg-coral-pulse/10 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
      
      <div className="max-w-container-max mx-auto relative z-10 flex flex-col md:flex-row items-center gap-16">
        
        {/* Left column */}
        <div className="flex-1 text-left">
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-6 leading-tight">
            Discover careers you <br className="hidden md:inline" /> didn't know existed.
          </h2>

          <div className="bg-surface-white/10 backdrop-blur-md rounded-[24px] p-8 border border-white/20 mb-8">
            <h3 className="font-title-md text-title-md mb-4 text-surface-white font-bold">
              Your Potential Matches:
            </h3>
            
            <div className="flex flex-wrap gap-3 mb-6">
              {careerTags.map((tag) => {
                const isMatchingQuiz = selectedTag === tag.name;
                return (
                  <span 
                    key={tag.name}
                    onClick={() => setSelectedTag(tag.name)}
                    className={`cursor-pointer px-4 py-2 rounded-full font-label-md text-label-md transition-all duration-300 ${tag.color} ${isMatchingQuiz ? 'ring-2 ring-amber-glow ring-offset-2 ring-offset-deep-indigo scale-105 font-bold shadow-lg' : 'hover:bg-white/25'}`}
                  >
                    {tag.name} {isMatchingQuiz && '✨'}
                  </span>
                );
              })}
            </div>
            
            <p className="font-body-md text-body-md text-surface-white/80">
              <span className="font-bold">AI Insight:</span> {selectedTag 
                ? `You have selected or matched with ${selectedTag}. We recommend custom certifications and networking roadmaps for fast entry.` 
                : "Your strong visual intuition combined with logical problem-solving points towards high-growth tech design roles."}
            </p>
          </div>

          {/* Form / Success State */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg">
              <div className="flex-1 flex flex-col gap-1">
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface-white/10 border border-white/30 rounded-xl px-4 py-4 text-surface-white placeholder:text-surface-white/50 focus:ring-2 focus:ring-coral-pulse focus:border-transparent outline-none h-14" 
                  placeholder="Enter your email" 
                />
                {error && <span className="text-red-400 text-xs font-semibold px-1 mt-1">{error}</span>}
              </div>
              <button 
                type="submit"
                className="sunrise-gradient text-on-primary font-title-md text-label-md px-6 py-4 rounded-xl hover:shadow-lg transition-all h-14 whitespace-nowrap font-bold hover:scale-[1.02] active:scale-[0.98]"
              >
                Get my full roadmap
              </button>
            </form>
          ) : (
            <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-xl p-6 max-w-lg text-left animate-fadeIn">
              <div className="flex items-center gap-3 mb-2 text-emerald-400">
                <span className="material-symbols-outlined text-3xl">check_circle</span>
                <span className="font-bold text-lg">Roadmap Sent!</span>
              </div>
              <p className="text-surface-white/90 text-sm leading-relaxed">
                Check your inbox at <span className="font-bold text-amber-glow">{email}</span>. We've compiled your custom AI-driven preparation roadmap for {selectedTag || 'UX Designer'}. Let's get moving!
              </p>
            </div>
          )}
        </div>

        {/* Right column (Illustration placeholder or graphic) */}
        <div className="flex-1 flex justify-center w-full">
          <div className="w-full max-w-sm relative">
            <div className="absolute inset-0 bg-coral-pulse/10 rounded-full blur-3xl opacity-30"></div>
            <div className="border border-white/10 bg-white/5 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-white/20 rounded-md w-3/4"></div>
                <div className="h-30 bg-white/5 rounded-lg p-4 space-y-2 border border-white/10">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-surface-white/60">Selected Path</span>
                    <span className="text-xs text-amber-glow font-bold">{selectedTag || 'UX Designer'}</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full w-full mt-2">
                    <div className="bg-coral-pulse h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-surface-white/40 mt-1">
                    <span>Month 1: Design Core</span>
                    <span>Month 3: Portfolio</span>
                  </div>
                </div>
                <div className="h-10 bg-coral-pulse/20 border border-coral-pulse/30 rounded-xl flex items-center justify-center text-xs text-coral-pulse font-bold">
                  Roadmap PDF Generated
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
