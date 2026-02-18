'use client';

import { useEffect, useRef, useCallback } from 'react';

/**
 * LiquidGlassCursor — Desktop-only custom cursor with liquid glass aesthetics.
 *
 * - Enabled only on fine-pointer (non-touch) devices.
 * - Uses rAF lerp for smooth 60fps+ movement (no React state per mousemove).
 * - Restores native cursor on text inputs, textareas, and contenteditable.
 * - Supports data-cursor="link" for interactive hover enlargement.
 * - Respects prefers-reduced-motion (disables trail, simplifies animation).
 * - Renders as pointer-events:none fixed overlay — never blocks interactions.
 */
export default function LiquidGlassCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const trailPos = useRef({ x: -100, y: -100 });
  const rafId = useRef(0);
  const isHovering = useRef(false);
  const isVisible = useRef(false);
  const styleInjected = useRef(false);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  // Inject / remove body cursor:none styles
  const injectStyles = useCallback(() => {
    if (styleInjected.current) return;
    const style = document.createElement('style');
    style.id = 'liquid-glass-cursor-styles';
    style.textContent = `
      @media (pointer: fine) {
        *, *::before, *::after {
          cursor: none !important;
        }
        input, textarea, select, [contenteditable="true"] {
          cursor: text !important;
        }
        input[type="submit"], input[type="button"], input[type="reset"] {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(style);
    styleInjected.current = true;
  }, []);

  const removeStyles = useCallback(() => {
    const el = document.getElementById('liquid-glass-cursor-styles');
    if (el) el.remove();
    styleInjected.current = false;
  }, []);

  useEffect(() => {
    // Only enable on fine pointer, non-touch
    const finePointer = globalThis.matchMedia('(pointer: fine)');
    const reducedMotion = globalThis.matchMedia('(prefers-reduced-motion: reduce)');

    if (!finePointer.matches) return;

    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor) return;

    injectStyles();

    const disableTrail = reducedMotion.matches;

    // Hide trail if reduced motion
    if (trail && disableTrail) {
      trail.style.display = 'none';
    }

    const handleMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!isVisible.current) {
        isVisible.current = true;
        cursor.style.opacity = '1';
        if (trail && !disableTrail) trail.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      isVisible.current = false;
      cursor.style.opacity = '0';
      if (trail) trail.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      isVisible.current = true;
      cursor.style.opacity = '1';
      if (trail && !disableTrail) trail.style.opacity = '1';
    };

    // Text input detection — hide custom cursor over text fields
    const isTextInput = (el: HTMLElement) =>
      el.closest('input:not([type="submit"]):not([type="button"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]):not([type="range"]), textarea, [contenteditable="true"]');

    // Interactive hover detection via event delegation
    const handlePointerOver = (e: PointerEvent) => {
      const el = e.target as HTMLElement;

      // Hide orb entirely over text inputs
      if (isTextInput(el)) {
        cursor.style.opacity = '0';
        if (trail) trail.style.opacity = '0';
        return;
      }

      const interactive = el.closest(
        'a, button, [role="button"], [data-cursor="link"], input[type="submit"], input[type="button"], input[type="reset"], summary'
      );
      if (interactive) {
        isHovering.current = true;
        cursor.classList.add('cursor-hover');
      }
    };

    const handlePointerOut = (e: PointerEvent) => {
      const el = e.target as HTMLElement;

      // Restore orb when leaving text inputs
      if (isTextInput(el)) {
        cursor.style.opacity = '1';
        if (trail && !disableTrail) trail.style.opacity = '1';
        return;
      }

      const interactive = el.closest(
        'a, button, [role="button"], [data-cursor="link"], input[type="submit"], input[type="button"], input[type="reset"], summary'
      );
      if (interactive) {
        isHovering.current = false;
        cursor.classList.remove('cursor-hover');
      }
    };

    // rAF animation loop
    const animate = () => {
      const speed = reducedMotion.matches ? 1 : 0.15;
      const trailSpeed = 0.08;

      pos.current.x = lerp(pos.current.x, target.current.x, speed);
      pos.current.y = lerp(pos.current.y, target.current.y, speed);

      cursor.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;

      if (trail && !disableTrail) {
        trailPos.current.x = lerp(trailPos.current.x, target.current.x, trailSpeed);
        trailPos.current.y = lerp(trailPos.current.y, target.current.y, trailSpeed);
        trail.style.transform = `translate3d(${trailPos.current.x}px, ${trailPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('pointerover', handlePointerOver, { passive: true });
    document.addEventListener('pointerout', handlePointerOut, { passive: true });

    // Watch for pointer type changes (e.g. tablet switched to touch)
    const handlePointerChange = () => {
      if (finePointer.matches) {
        injectStyles();
        rafId.current = requestAnimationFrame(animate);
      } else {
        removeStyles();
        cursor.style.opacity = '0';
        if (trail) trail.style.opacity = '0';
        cancelAnimationFrame(rafId.current);
      }
    };
    finePointer.addEventListener('change', handlePointerChange);

    return () => {
      cancelAnimationFrame(rafId.current);
      removeStyles();
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerout', handlePointerOut);
      finePointer.removeEventListener('change', handlePointerChange);
    };
  }, [injectStyles, removeStyles]);

  return (
    <>
      {/* Main cursor orb */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="liquid-cursor"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          marginLeft: '-16px',
          marginTop: '-16px',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0,
          willChange: 'transform',
          transition: 'width 0.3s cubic-bezier(0.23,1,0.32,1), height 0.3s cubic-bezier(0.23,1,0.32,1), margin 0.3s cubic-bezier(0.23,1,0.32,1), opacity 0.25s ease',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, rgba(198, 255, 0, 0.18), rgba(198, 255, 0, 0.06) 50%, rgba(255,255,255,0.03) 80%, transparent)',
          border: '1px solid rgba(198, 255, 0, 0.15)',
          boxShadow: '0 0 20px rgba(198, 255, 0, 0.08), inset 0 0 12px rgba(255,255,255,0.04)',
        }}
      />
      {/* Trail / goo orb */}
      <div
        ref={trailRef}
        aria-hidden="true"
        className="liquid-cursor-trail"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '52px',
          height: '52px',
          marginLeft: '-26px',
          marginTop: '-26px',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: 0,
          willChange: 'transform',
          transition: 'opacity 0.4s ease',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 40% 40%, rgba(198, 255, 0, 0.06), rgba(198, 255, 0, 0.02) 60%, transparent)',
          border: '1px solid rgba(198, 255, 0, 0.05)',
          filter: 'blur(1px)',
        }}
      />
    </>
  );
}
