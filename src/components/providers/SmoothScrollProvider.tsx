'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Initializes Lenis smooth scroll. Disabled when prefers-reduced-motion.
 * Renders nothing — just runs the side effect.
 */
export default function SmoothScrollProvider() {
  const reducedMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number>(0);

  useEffect(() => {
    if (reducedMotion) {
      cancelAnimationFrame(rafIdRef.current);
      lenisRef.current?.destroy();
      lenisRef.current = null;
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    }
    rafIdRef.current = requestAnimationFrame(raf);

    // Make anchors work with Lenis
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href) return;
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -64 });
      }
    };
    document.addEventListener('click', handleClick);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      document.removeEventListener('click', handleClick);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return null;
}
