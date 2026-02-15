'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems, personalInfo } from '@/content/portfolio';
import { useActiveSection } from '@/hooks/useActiveSection';
import Button from '@/components/ui/Button';
import MobileMenu from './MobileMenu';

const sectionIds = navItems.map((item) => item.href.replace('#', ''));

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection(sectionIds);

  const toggleMobile = useCallback(() => setMobileOpen((v) => !v), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <motion.header
        className="fixed top-0 right-0 left-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
        role="banner"
      >
        <nav
          className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a
            href="#hero"
            className="text-lg font-bold text-primary-text transition-colors hover:text-accent"
            aria-label="Go to top"
          >
            {personalInfo.name.split(' ')[0]}
            <span className="text-accent">.</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-0.5 md:flex">
            {navItems.map(({ label, href }) => {
              const id = href.replace('#', '');
              const isActive = active === id;
              return (
                <li key={href}>
                  <a
                    href={href}
                    className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors min-h-[36px] inline-flex items-center ${
                      isActive
                        ? 'text-accent'
                        : 'text-secondary-text hover:text-primary-text hover:bg-white/5'
                    }`}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-x-1 -bottom-[1.1rem] h-[2px] bg-accent"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button href="#contact" size="sm">
              Hire me
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="relative z-50 flex h-11 w-11 items-center justify-center rounded-lg text-primary-text transition-colors hover:bg-white/5 md:hidden"
            onClick={toggleMobile}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            <div className="flex w-5 flex-col gap-1.5">
              <motion.span
                className="block h-[2px] w-full bg-current"
                animate={mobileOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-[2px] w-full bg-current"
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.1 }}
              />
              <motion.span
                className="block h-[2px] w-full bg-current"
                animate={mobileOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu active={active} onClose={closeMobile} />
        )}
      </AnimatePresence>
    </>
  );
}
