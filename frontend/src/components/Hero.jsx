import React from 'react';

export default function Hero({ onStartQuiz }) {
  return (
    <section className="relative px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-16 md:py-24 flex flex-col md:flex-row items-center gap-12 overflow-hidden">
      {/* Text Content */}
      <div className="flex-1 z-10 text-left">
        <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-deep-indigo dark:text-surface-white mb-6 leading-tight">
          Your boards are done. <br />
          <span className="text-coral-pulse dark:text-amber-glow">Now what?</span>
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-surface-variant/80 mb-10 max-w-lg">
          A 2-minute AI check to find the careers you'll actually love. No stress, just clarity.
        </p>
        <button 
          onClick={onStartQuiz}
          className="sunrise-gradient text-on-primary font-title-md text-title-md px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 sunrise-shadow flex items-center gap-3 group text-lg hover:scale-[1.03] active:scale-[0.98]"
        >
          <span>Start your 2-minute check</span>
          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </button>
      </div>

      {/* Visual Floating Cards Area */}
      <div className="flex-1 relative w-full h-[320px] md:h-[450px] flex items-center justify-center">
        {/* Decorative Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary-fixed-dim/30 dark:bg-coral-pulse/10 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-12 right-12 w-48 h-48 bg-tertiary-fixed/20 dark:bg-tertiary/10 rounded-full blur-2xl opacity-40"></div>

        {/* UI Designer Card (Slow Floating) */}
        <div className="absolute top-6 right-6 md:right-10 bg-surface-white dark:bg-deep-indigo rounded-[24px] p-6 shadow-xl dark:shadow-2xl border border-surface-variant/50 dark:border-white/10 w-64 animate-float-slow hover:animation-none hover:rotate-0 hover:scale-105 transition-all duration-500 z-20 cursor-pointer">
          <div className="h-1.5 w-full sunrise-gradient rounded-full mb-4 absolute top-0 left-0 rounded-t-[24px]"></div>
          
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-tertiary-fixed dark:bg-tertiary/20 flex items-center justify-center text-tertiary dark:text-tertiary-fixed">
              <span className="material-symbols-outlined">design_services</span>
            </div>
            <span className="font-title-md text-label-md text-deep-indigo dark:text-surface-white font-bold">UI Designer</span>
          </div>
          
          <p className="font-body-md text-label-sm text-on-surface-variant dark:text-surface-variant/80">
            High match for creative problem solving & visual design.
          </p>
        </div>

        {/* Product Manager Card (Medium Floating) */}
        <div className="absolute bottom-6 left-6 md:left-10 bg-surface-white dark:bg-deep-indigo rounded-[24px] p-6 shadow-xl dark:shadow-2xl border border-surface-variant/50 dark:border-white/10 w-64 animate-float-medium hover:animation-none hover:rotate-0 hover:scale-105 transition-all duration-500 z-10 cursor-pointer">
          <div className="h-1.5 w-full bg-deep-indigo dark:bg-amber-glow rounded-full mb-4 absolute top-0 left-0 rounded-t-[24px]"></div>
          
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-secondary-fixed dark:bg-secondary/20 flex items-center justify-center text-secondary dark:text-secondary-fixed">
              <span className="material-symbols-outlined">trending_up</span>
            </div>
            <span className="font-title-md text-label-md text-deep-indigo dark:text-surface-white font-bold">Product Manager</span>
          </div>
          
          <p className="font-body-md text-label-sm text-on-surface-variant dark:text-surface-variant/80">
            Perfect match for leadership, organization & strategy.
          </p>
        </div>
      </div>
    </section>
  );
}
