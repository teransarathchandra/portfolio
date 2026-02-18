'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const LENIS_SCROLL_EVENT = 'portfolio:lenis-scroll';

export type LenisScrollDetail = {
  scroll: number;
  limit: number;
  progress: number;
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function getNativeScrollMetrics(): LenisScrollDetail {
  const doc = document.documentElement;
  const limit = Math.max(doc.scrollHeight - window.innerHeight, 1);
  const scroll = window.scrollY;
  const progress = clamp(scroll / limit, 0, 1);

  return { scroll, limit, progress };
}

function emitLenisScroll(detail: LenisScrollDetail): void {
  window.dispatchEvent(
    new CustomEvent<LenisScrollDetail>(LENIS_SCROLL_EVENT, { detail })
  );
}

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

    const onScroll = (instance: Lenis) => {
      const limit = Math.max(instance.limit, 1);
      emitLenisScroll({
        scroll: instance.scroll,
        limit,
        progress: clamp(instance.progress, 0, 1),
      });
    };
    lenis.on('scroll', onScroll);
    emitLenisScroll(getNativeScrollMetrics());

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
    const handleResize = () => {
      emitLenisScroll(getNativeScrollMetrics());
    };
    document.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      document.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      lenis.off('scroll', onScroll);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return null;
}
