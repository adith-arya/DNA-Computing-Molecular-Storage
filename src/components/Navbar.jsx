import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navigationItems = [
  { label: 'Home', to: '/', section: '' },
  { label: 'DNA Basics', to: '/#section-what-is-dna', section: 'section-what-is-dna' },
  { label: '7-Stage Pipeline', to: '/#section-pipeline', section: 'section-pipeline' },
  { label: 'Real-World Storage', to: '/#section-real-world', section: 'section-real-world' },
  { label: 'Biocomputing', to: '/#section-computing', section: 'section-computing' },
];

const simulatorButtonClass =
  'inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition duration-200 hover:-translate-y-0.5 hover:from-indigo-700 hover:to-violet-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 active:translate-y-0';

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (item) =>
    location.pathname === '/' &&
    (item.section ? location.hash === `#${item.section}` : !location.hash);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm shadow-slate-900/[0.03] backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          onClick={closeMenu}
          className="group flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
          aria-label="HelixLab home"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center transition-transform duration-200 group-hover:scale-105">
            <img src="/helixlab-mark.svg" alt="" className="hidden h-11 w-11 sm:block" />
            <img src="/helixlab-mark-compact.svg" alt="" className="h-10 w-10 sm:hidden" />
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="text-[17px] font-bold leading-tight tracking-tight text-slate-900 transition-colors group-hover:text-indigo-700">
              HelixLab
            </span>
            <span className="hidden text-[10px] font-medium leading-tight tracking-wide text-slate-500 sm:block">
              DNA Computing &amp; Molecular Data Storage
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Main navigation">
          {navigationItems.map((item) => {
            const active = isActive(item);
            return (
              <Link
                key={item.label}
                to={item.to}
                aria-current={active ? 'page' : undefined}
                className={`relative rounded-lg px-3 py-2 text-[13px] font-medium transition-colors duration-200 after:absolute after:inset-x-3 after:-bottom-[18px] after:h-0.5 after:rounded-full after:bg-indigo-600 after:transition-transform after:duration-200 ${
                  active
                    ? 'text-indigo-700 after:scale-x-100'
                    : 'text-slate-600 after:scale-x-0 hover:bg-slate-50 hover:text-slate-900 hover:after:scale-x-100'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            to="/simulator"
            className={`${simulatorButtonClass} hidden sm:inline-flex xl:px-4 xl:text-[13px]`}
            aria-current={location.pathname === '/simulator' ? 'page' : undefined}
          >
            Launch Simulator
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4.5 10h10m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 xl:hidden"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="m6 6 12 12M18 6 6 18" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          id="mobile-navigation"
          className="border-t border-slate-100 bg-white px-4 pb-5 pt-3 shadow-lg shadow-slate-900/[0.04] sm:px-6 xl:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navigationItems.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={closeMenu}
                  aria-current={active ? 'page' : undefined}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-indigo-700'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              to="/simulator"
              onClick={closeMenu}
              className={`${simulatorButtonClass} mt-2 sm:hidden`}
              aria-current={location.pathname === '/simulator' ? 'page' : undefined}
            >
              Launch Simulator
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4.5 10h10m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
