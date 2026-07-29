import React, { useState, useEffect } from 'react';

const QUESTIONS = [
  {
    id: 1,
    badge: 'Select your vibe',
    question: 'What sounds more fun?',
    options: [
      {
        text: 'Solving complex puzzles',
        icon: 'extension',
        color: 'text-tertiary dark:text-tertiary-fixed-dim',
        value: 'analytical',
      },
      {
        text: 'Creating beautiful visuals',
        icon: 'palette',
        color: 'text-coral-pulse dark:text-amber-glow',
        value: 'creative',
      }
    ]
  },
  {
    id: 2,
    badge: 'Choose your focus',
    question: 'Where would you spend hours?',
    options: [
      {
        text: 'Writing system logic & code',
        icon: 'code',
        color: 'text-primary dark:text-primary-fixed-dim',
        value: 'code',
      },
      {
        text: 'Mapping user journeys',
        icon: 'view_quilt',
        color: 'text-secondary dark:text-secondary-fixed-dim',
        value: 'design',
      }
    ]
  },
  {
    id: 3,
    badge: 'Pick your workflow',
    question: 'How do you organize work?',
    options: [
      {
        text: 'Metrics, timelines & goals',
        icon: 'assessment',
        color: 'text-deep-indigo dark:text-tertiary-fixed',
        value: 'business',
      },
      {
        text: 'Brainstorms, copy & ideas',
        icon: 'border_color',
        color: 'text-tertiary dark:text-tertiary-fixed-dim',
        value: 'strategy',
      }
    ]
  }
];

export default function Quiz({ onQuizComplete }) {
  const [currentStep, setCurrentStep] = useState(0); // 0, 1, 2 = Questions; 3 = Loading; 4 = Result
  const [answers, setAnswers] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [resultMatch, setResultMatch] = useState(null);

  const handleOptionSelect = (optionValue) => {
    const newAnswers = [...answers, optionValue];
    setAnswers(newAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Go to loading step
      setCurrentStep(3);
    }
  };

  // Simulate AI matching progress
  useEffect(() => {
    if (currentStep === 3) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            calculateResult();
            return 100;
          }
          return prev + 8;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [currentStep]);

  const calculateResult = () => {
    // Basic recommendation logic based on selected answers
    const values = [...answers];
    let match = {
      title: 'UX Designer',
      percentage: '96%',
      badge: 'Highly Creative & Visual',
      desc: 'Perfect for your blend of visual aesthetics and user empathy.',
      icon: 'design_services',
      tagColor: 'bg-coral-pulse/20 text-primary dark:text-primary-fixed border border-coral-pulse/30'
    };

    if (values[0] === 'analytical' && values[1] === 'code') {
      match = {
        title: 'Full-Stack Engineer',
        percentage: '98%',
        badge: 'Logical & Systems Architect',
        desc: 'Great for building robust, scalable logic and interactive databases.',
        icon: 'developer_mode',
        tagColor: 'bg-primary/20 text-primary dark:text-primary-fixed border border-primary/30'
      };
    } else if (values[0] === 'analytical' && values[1] === 'design' && values[2] === 'business') {
      match = {
        title: 'Product Manager',
        percentage: '94%',
        badge: 'Leadership & Strategy',
        desc: 'Ideal for organizing teams, tracking key metrics, and leading timelines.',
        icon: 'trending_up',
        tagColor: 'bg-amber-glow/20 text-secondary dark:text-secondary-fixed border border-amber-glow/30'
      };
    } else if (values[0] === 'creative' && values[2] === 'strategy') {
      match = {
        title: 'Creative Strategist',
        percentage: '92%',
        badge: 'Marketing & Concept Ideation',
        desc: 'Perfect for building visual ad campaigns and designing product marketing strategies.',
        icon: 'campaign',
        tagColor: 'bg-tertiary/20 text-tertiary dark:text-tertiary-fixed border border-tertiary/30'
      };
    } else if (values[1] === 'design' && values[2] === 'strategy') {
      match = {
        title: 'Growth Hacker',
        percentage: '95%',
        badge: 'Product growth & Funnels',
        desc: 'Suits your creative mind combined with user-facing experimentations.',
        icon: 'rocket_launch',
        tagColor: 'bg-amber-glow/20 text-secondary dark:text-secondary-fixed border border-amber-glow/30'
      };
    }

    setResultMatch(match);
    setCurrentStep(4);
    if (onQuizComplete) {
      onQuizComplete(match.title);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setLoadingProgress(0);
    setResultMatch(null);
  };

  const progressPercentage = currentStep <= 2 
    ? ((currentStep + 1) / QUESTIONS.length) * 100 
    : loadingProgress;

  return (
    <section id="career-quiz" className="bg-surface-container-low dark:bg-deep-indigo/40 py-20 px-margin-mobile md:px-margin-desktop transition-colors duration-300">
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row items-center gap-16">
        
        {/* Left Side: Mockup Frame Quiz */}
        <div className="flex-1 order-2 md:order-1 flex justify-center w-full">
          <div className="bg-surface-white dark:bg-deep-indigo rounded-[32px] shadow-2xl dark:shadow-white/5 p-4 w-[320px] h-[550px] border-8 border-surface-container-highest dark:border-white/10 relative flex flex-col transition-all duration-300">
            {/* Phone Speaker Notch */}
            <div className="w-32 h-6 bg-surface-container-highest dark:bg-white/10 rounded-b-xl mx-auto absolute top-0 left-1/2 -translate-x-1/2"></div>
            
            {/* Progress Bar Header */}
            <div className="mt-8 mb-6 flex justify-between items-center px-2">
              <div className="w-full bg-surface-variant dark:bg-white/10 rounded-full h-2 overflow-hidden">
                <div 
                  className="sunrise-gradient h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Quiz Content States */}
            {currentStep <= 2 && (
              <div className="flex flex-col flex-1">
                <div className="text-center mb-6 px-4">
                  <span className="inline-block bg-primary-fixed dark:bg-coral-pulse/20 text-on-primary-container dark:text-coral-pulse font-label-sm text-label-sm px-3 py-1 rounded-full mb-3">
                    {QUESTIONS[currentStep].badge}
                  </span>
                  <h3 className="font-title-md text-title-md text-deep-indigo dark:text-surface-white">
                    {QUESTIONS[currentStep].question}
                  </h3>
                </div>

                {/* Option Buttons */}
                <div className="flex flex-col gap-4 px-2 flex-1 pb-4">
                  {QUESTIONS[currentStep].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(option.value)}
                      className="flex-1 bg-surface-container dark:bg-white/5 rounded-xl p-4 flex flex-col items-center justify-center gap-3 border border-transparent hover:border-coral-pulse/30 dark:hover:border-amber-glow/30 hover:bg-surface-container-high dark:hover:bg-white/10 transition-all duration-200 group active:scale-[0.98]"
                    >
                      <span className={`material-symbols-outlined text-4xl ${option.color} group-hover:scale-110 transition-transform`}>
                        {option.icon}
                      </span>
                      <span className="font-label-md text-label-md text-on-surface dark:text-surface-white font-medium text-center">
                        {option.text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Loading AI match State */}
            {currentStep === 3 && (
              <div className="flex flex-col items-center justify-center flex-1 px-4 text-center">
                <div className="w-16 h-16 rounded-full border-4 border-surface-container-highest border-t-coral-pulse animate-spin mb-6"></div>
                <h4 className="font-title-md text-title-md text-deep-indigo dark:text-surface-white mb-2">Analyzing Responses</h4>
                <p className="font-body-md text-label-sm text-on-surface-variant dark:text-surface-variant">
                  Our AI is mapping your answers against 120+ tech and creative roles...
                </p>
                <div className="text-sm font-bold text-coral-pulse mt-4">{loadingProgress}%</div>
              </div>
            )}

            {/* Match Result State */}
            {currentStep === 4 && resultMatch && (
              <div className="flex flex-col flex-1 justify-between p-2">
                <div className="text-center mt-2">
                  <span className="inline-block bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-label-sm text-label-sm px-3 py-1 rounded-full mb-3 font-semibold">
                    {resultMatch.percentage} Career Match!
                  </span>
                  
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary-fixed/20 dark:bg-white/10 flex items-center justify-center text-primary dark:text-amber-glow mb-4">
                    <span className="material-symbols-outlined text-4xl">{resultMatch.icon}</span>
                  </div>

                  <h3 className="font-display-lg text-title-md font-bold text-deep-indigo dark:text-surface-white mb-1">
                    {resultMatch.title}
                  </h3>
                  
                  <p className="text-xs text-on-surface-variant dark:text-surface-variant/60 font-semibold mb-4 uppercase tracking-wider">
                    {resultMatch.badge}
                  </p>
                  
                  <p className="font-body-md text-label-sm text-on-surface-variant dark:text-surface-variant px-4">
                    {resultMatch.desc}
                  </p>
                </div>

                <div className="flex flex-col gap-3 mb-4">
                  <a
                    href="#cta-section"
                    className="sunrise-gradient text-on-primary text-center font-label-md text-label-md py-3 rounded-xl hover:shadow-lg transition-all text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <span>Get Free Roadmap</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </a>
                  <button
                    onClick={handleReset}
                    className="bg-surface-container dark:bg-white/5 hover:bg-surface-container-high dark:hover:bg-white/10 text-on-surface dark:text-surface-white font-label-md text-label-md py-2.5 rounded-xl transition-all text-xs"
                  >
                    Take Quiz Again
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Copywriting */}
        <div className="flex-1 order-1 md:order-2 text-left">
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-deep-indigo dark:text-surface-white mb-6">
            Intuitive & Fast.
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-surface-variant mb-8">
            Forget long, boring, and tedious forms. Our AI asks dynamic "This or That" questions to quickly map your core interests and strengths in under 2 minutes.
          </p>
          
          <ul className="space-y-4">
            <li className="flex items-center gap-3 font-body-md text-body-md text-on-surface dark:text-surface-white">
              <span className="material-symbols-outlined text-coral-pulse dark:text-amber-glow">check_circle</span> 
              <span>Visual and engaging choice matrix</span>
            </li>
            <li className="flex items-center gap-3 font-body-md text-body-md text-on-surface dark:text-surface-white">
              <span className="material-symbols-outlined text-coral-pulse dark:text-amber-glow">check_circle</span> 
              <span>Dynamically adapts to your responses</span>
            </li>
            <li className="flex items-center gap-3 font-body-md text-body-md text-on-surface dark:text-surface-white">
              <span className="material-symbols-outlined text-coral-pulse dark:text-amber-glow">check_circle</span> 
              <span>Instant compatibility analysis</span>
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
}
