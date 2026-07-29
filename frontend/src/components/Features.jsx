import React from 'react';

const STEPS = [
  {
    num: '1',
    title: '2-Min Quiz',
    desc: 'Take our rapid-fire visual assessment to capture your core vibe.',
    badgeColor: 'sunrise-gradient text-on-primary',
  },
  {
    num: '2',
    title: 'AI Matches',
    desc: 'Get a curated shortlist of Safe, In-demand, and Unconventional options.',
    badgeColor: 'bg-tertiary-fixed dark:bg-tertiary/20 text-tertiary dark:text-tertiary-fixed',
  },
  {
    num: '3',
    title: 'Unlock Roadmap',
    desc: 'See the exact steps, courses, and certifications needed to bridge the gap.',
    badgeColor: 'bg-secondary-fixed dark:bg-secondary/20 text-secondary dark:text-secondary-fixed',
  },
  {
    num: '4',
    title: 'Gentle Nudges',
    desc: 'Receive low-key, high-value check-ins only when career pivots matter.',
    badgeColor: 'bg-surface-container-high dark:bg-white/10 text-on-surface-variant dark:text-surface-white',
  }
];

export default function Features() {
  return (
    <section id="how-it-works" className="py-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-left">
      <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-deep-indigo dark:text-surface-white text-center mb-16">
        How to find your path
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {STEPS.map((step, idx) => (
          <div 
            key={idx} 
            className="bg-surface-white dark:bg-deep-indigo/60 rounded-[24px] p-6 border border-surface-variant/50 dark:border-white/15 hover:shadow-lg dark:hover:shadow-white/5 transition-all duration-300 relative group hover:-translate-y-1"
          >
            {/* Desktop Connector Line */}
            {idx > 0 && (
              <div className="hidden md:block absolute top-12 -left-4 w-8 h-px bg-surface-variant dark:bg-white/15 z-0"></div>
            )}
            
            <div className={`w-12 h-12 rounded-xl ${step.badgeColor} flex items-center justify-center mb-4 font-bold text-xl transition-transform duration-300 group-hover:scale-105`}>
              {step.num}
            </div>
            
            <h3 className="font-title-md text-title-md text-deep-indigo dark:text-surface-white mb-2 font-bold">
              {step.title}
            </h3>
            
            <p className="font-body-md text-body-md text-on-surface-variant dark:text-surface-variant/80">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
