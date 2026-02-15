'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { navItems } from '@/content/portfolio';
import Button from '@/components/ui/Button';

interface MobileMenuProps {
  active: string;
  onClose: () => void;
}

export default function MobileMenu({ active, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Focus the first link when menu opens
  useEffect(() => {
    firstLinkRef.current?.focus();
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Trap focus within menu
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== 'Tab' || !menuRef.current) return;
      const focusable = menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    []
  );

  return (
    <motion.div
      ref={menuRef}
      className="mobile-menu-overlay fixed inset-0 z-40 flex flex-col bg-background/95 backdrop-blur-2xl md:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      onKeyDown={handleKeyDown}
    >
      <nav className="flex flex-1 flex-col items-center justify-center gap-2" aria-label="Mobile navigation">
        {navItems.map(({ label, href }, i) => {
          const id = href.replace('#', '');
          const isActive = active === id;
          return (
            <motion.a
              key={href}
              href={href}
              ref={i === 0 ? firstLinkRef : undefined}
              onClick={onClose}
              className={`rounded-xl px-6 py-3 text-lg font-medium transition-colors ${
                isActive
                  ? 'text-accent'
                  : 'text-secondary-text hover:text-primary-text'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.3 }}
            >
              {label}
            </motion.a>
          );
        })}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 * navItems.length, duration: 0.3 }}
          className="mt-4"
        >
          <Button href="#contact" onClick={onClose}>
            Hire me
          </Button>
        </motion.div>
      </nav>
    </motion.div>
  );
}
