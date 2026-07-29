import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-16 bg-surface-container-lowest dark:bg-deep-indigo border-t border-surface-variant dark:border-white/5 px-margin-mobile md:px-margin-desktop transition-colors duration-300">
      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 text-left">
        
        {/* Info Column */}
        <div className="md:col-span-1">
          <span className="font-headline-lg text-headline-lg font-bold text-primary dark:text-coral-pulse mb-4 block">
            WayForward
          </span>
          <p className="font-body-md text-body-md text-tertiary dark:text-tertiary-fixed-dim">
            Your AI-driven co-pilot for navigating the future of careers.
          </p>
        </div>

        {/* Product Column */}
        <div>
          <h4 className="font-title-md text-label-md text-deep-indigo dark:text-surface-white font-bold mb-4">
            Product
          </h4>
          <ul className="space-y-2">
            <li>
              <a className="font-body-md text-body-md text-on-surface-variant dark:text-surface-variant/80 hover:text-coral-pulse transition-colors" href="#career-quiz">
                Career Coaching
              </a>
            </li>
            <li>
              <a className="font-body-md text-body-md text-on-surface-variant dark:text-surface-variant/80 hover:text-coral-pulse transition-colors" href="#career-quiz">
                Assessments
              </a>
            </li>
          </ul>
        </div>

        {/* Company Column */}
        <div>
          <h4 className="font-title-md text-label-md text-deep-indigo dark:text-surface-white font-bold mb-4">
            Company
          </h4>
          <ul className="space-y-2">
            <li>
              <a className="font-body-md text-body-md text-on-surface-variant dark:text-surface-variant/80 hover:text-coral-pulse transition-colors" href="#how-it-works">
                About Us
              </a>
            </li>
            <li>
              <a className="font-body-md text-body-md text-on-surface-variant dark:text-surface-variant/80 hover:text-coral-pulse transition-colors" href="#">
                Contact Support
              </a>
            </li>
          </ul>
        </div>

        {/* Legal Column */}
        <div>
          <h4 className="font-title-md text-label-md text-deep-indigo dark:text-surface-white font-bold mb-4">
            Legal
          </h4>
          <ul className="space-y-2">
            <li>
              <a className="font-body-md text-body-md text-on-surface-variant dark:text-surface-variant/80 hover:text-coral-pulse transition-colors" href="#">
                Privacy Policy
              </a>
            </li>
            <li>
              <a className="font-body-md text-body-md text-on-surface-variant dark:text-surface-variant/80 hover:text-coral-pulse transition-colors" href="#">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright bar */}
      <div className="max-w-container-max mx-auto text-center border-t border-surface-variant dark:border-white/10 pt-8 mt-8">
        <p className="font-body-md text-body-md text-tertiary dark:text-tertiary-fixed-dim">
          © {new Date().getFullYear()} WayForward. Your co-pilot for the future.
        </p>
      </div>
    </footer>
  );
}
