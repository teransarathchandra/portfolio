'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type Star = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  driftX: number;
  driftY: number;
  radius: number;
  opacity: number;
  depth: number;
  colorIndex: 0 | 1 | 2;
};

type DrawPoint = {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  depth: number;
  colorIndex: 0 | 1 | 2;
  cellX: number;
  cellY: number;
};

const POINTER_COARSE_QUERY = '(pointer: coarse)';
const DPR_CAP = 1.25;
const MIN_STARS = 90;
const MAX_STARS = 220;
const SCROLL_LERP = 0.1;
const MOUSE_LERP = 0.1;
const SCROLL_AMPLITUDE_X = 18;
const SCROLL_AMPLITUDE_Y = 40;
const MOUSE_AMPLITUDE = 8;
const WRAP_MARGIN = 18;
const REPULSE_RADIUS = 170;
const REPULSE_RADIUS_SQ = REPULSE_RADIUS * REPULSE_RADIUS;
const REPULSE_FORCE = 0.22;
const MAX_SPEED = 0.22;

function pickStarColor(): 0 | 1 | 2 {
  const n = Math.random();
  if (n < 0.08) return 2;
  if (n < 0.38) return 1;
  return 0;
}

function subscribePointerCoarse(callback: () => void): () => void {
  if (typeof globalThis.matchMedia !== 'function') return () => {};
  const mql = globalThis.matchMedia(POINTER_COARSE_QUERY);
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

function getPointerCoarseSnapshot(): boolean {
  if (typeof globalThis.matchMedia !== 'function') return false;
  return globalThis.matchMedia(POINTER_COARSE_QUERY).matches;
}

function getPointerCoarseServerSnapshot(): boolean {
  return false;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function wrapForSpace(value: number, size: number, margin = WRAP_MARGIN): number {
  if (value < -margin) return size + margin;
  if (value > size + margin) return -margin;
  return value;
}

function wrapForRender(value: number, size: number): number {
  if (size <= 0) return value;
  const wrapped = value % size;
  return wrapped < 0 ? wrapped + size : wrapped;
}

function createStars(count: number, width: number, height: number): Star[] {
  const stars = new Array<Star>(count);

  for (let i = 0; i < count; i += 1) {
    const driftX = (Math.random() - 0.5) * 0.1;
    const driftY = (Math.random() - 0.5) * 0.1;

    stars[i] = {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: driftX,
      vy: driftY,
      driftX,
      driftY,
      radius: 1.25 + Math.random() * 1.55,
      opacity: 0.45 + Math.random() * 0.45,
      depth: 0.2 + Math.random() * 0.8,
      colorIndex: pickStarColor(),
    };
  }

  return stars;
}

function getScrollNormalized(): number {
  const doc = document.documentElement;
  const maxScroll = Math.max(doc.scrollHeight - window.innerHeight, 1);
  return clamp(window.scrollY / maxScroll, 0, 1);
}

function toCellKey(x: number, y: number): string {
  return `${x}:${y}`;
}

export default function StarMeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const coarsePointer = useSyncExternalStore(
    subscribePointerCoarse,
    getPointerCoarseSnapshot,
    getPointerCoarseServerSnapshot
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d') ?? canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let rafId = 0;
    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let maxDist = 130;
    let maxDistSq = maxDist * maxDist;
    let cellSize = maxDist;
    const drawPoints: DrawPoint[] = [];
    let targetScroll = getScrollNormalized();
    let smoothScroll = targetScroll;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let smoothMouseX = 0;
    let smoothMouseY = 0;
    let pointerX = -10000;
    let pointerY = -10000;
    let pointerInfluence = 0;
    let isPageVisible = document.visibilityState === 'visible';

    const staticMode = reducedMotion || coarsePointer;
    const drawLines = !staticMode;
    const trackPointer = !staticMode;

    const getStarCount = () => {
      const area = width * height;

      if (coarsePointer) {
        return clamp(Math.round(area / 60000), 25, 40);
      }

      if (reducedMotion) {
        return clamp(Math.round(area / 26000), 45, 100);
      }

      return clamp(Math.round(area / 18000), MIN_STARS, MAX_STARS);
    };

    const updateSizing = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      if (width <= 0 || height <= 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      maxDist = clamp(Math.round(Math.min(width, height) * 0.17), 110, 156);
      maxDistSq = maxDist * maxDist;
      cellSize = maxDist;
      stars = createStars(getStarCount(), width, height);
      drawPoints.length = stars.length;

      targetScroll = getScrollNormalized();
      smoothScroll = targetScroll;
    };

    const drawFrame = (allowParallax: boolean) => {
      if (width <= 0 || height <= 0) return;

      ctx.clearRect(0, 0, width, height);

      const centeredScroll = allowParallax ? smoothScroll * 2 - 1 : 0;
      const scrollOffsetX = centeredScroll * SCROLL_AMPLITUDE_X;
      const scrollOffsetY = centeredScroll * SCROLL_AMPLITUDE_Y;
      const mouseOffsetX = allowParallax ? smoothMouseX * MOUSE_AMPLITUDE : 0;
      const mouseOffsetY = allowParallax ? smoothMouseY * MOUSE_AMPLITUDE : 0;

      for (let i = 0; i < stars.length; i += 1) {
        const star = stars[i];
        const parallaxX = (scrollOffsetX + mouseOffsetX) * star.depth;
        const parallaxY = (scrollOffsetY + mouseOffsetY) * star.depth;
        const x = wrapForRender(star.x + parallaxX, width);
        const y = wrapForRender(star.y + parallaxY, height);

        drawPoints[i] = {
          x,
          y,
          radius: star.radius,
          opacity: star.opacity,
          depth: star.depth,
          colorIndex: star.colorIndex,
          cellX: Math.floor(x / cellSize),
          cellY: Math.floor(y / cellSize),
        };
      }

      if (drawLines) {
        const buckets = new Map<string, number[]>();

        for (let i = 0; i < drawPoints.length; i += 1) {
          const point = drawPoints[i];
          const key = toCellKey(point.cellX, point.cellY);
          const bucket = buckets.get(key);
          if (bucket) {
            bucket.push(i);
          } else {
            buckets.set(key, [i]);
          }
        }

        for (let i = 0; i < drawPoints.length; i += 1) {
          const a = drawPoints[i];

          for (let ox = -1; ox <= 1; ox += 1) {
            for (let oy = -1; oy <= 1; oy += 1) {
              const nearby = buckets.get(toCellKey(a.cellX + ox, a.cellY + oy));
              if (!nearby) continue;

              for (let n = 0; n < nearby.length; n += 1) {
                const j = nearby[n];
                if (j <= i) continue;

                const b = drawPoints[j];
                const dx = b.x - a.x;
                const dy = b.y - a.y;
                const distSq = dx * dx + dy * dy;

                if (distSq > maxDistSq) continue;

                const dist = Math.sqrt(distSq);
                const strength = 1 - dist / maxDist;
                const alpha = strength * 0.22 * ((a.opacity + b.opacity) * 0.5);
                if (alpha < 0.008) continue;

                const accentPair = a.colorIndex === 2 || b.colorIndex === 2;
                const mutedPair = a.colorIndex === 1 && b.colorIndex === 1;
                const lineAlpha = accentPair
                  ? Math.min(alpha * 0.5, 0.13)
                  : Math.min(alpha, 0.18);
                let lineColor = `rgba(160, 160, 168, ${lineAlpha})`;

                if (accentPair) {
                  lineColor = `rgba(198, 255, 0, ${lineAlpha})`;
                } else if (mutedPair) {
                  lineColor = `rgba(58, 58, 64, ${lineAlpha * 0.9})`;
                }

                ctx.strokeStyle = lineColor;
                ctx.lineWidth = 0.45 + strength * 0.35;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
              }
            }
          }
        }
      }

      for (let i = 0; i < drawPoints.length; i += 1) {
        const point = drawPoints[i];
        const baseAlpha = coarsePointer ? point.opacity * 0.8 : point.opacity * 0.9;

        if (point.colorIndex === 2) {
          ctx.fillStyle = `rgba(198, 255, 0, ${Math.min(baseAlpha * 0.92, 0.84)})`;
        } else if (point.colorIndex === 1) {
          ctx.fillStyle = `rgba(160, 160, 168, ${Math.min(baseAlpha * 0.88, 0.72)})`;
        } else {
          ctx.fillStyle = `rgba(245, 245, 245, ${baseAlpha})`;
        }
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fill();

        if (point.colorIndex === 2 && !coarsePointer && !reducedMotion) {
          const glowAlpha = Math.min(baseAlpha * 0.35, 0.18);
          ctx.fillStyle = `rgba(198, 255, 0, ${glowAlpha})`;
          ctx.beginPath();
          ctx.arc(point.x, point.y, point.radius * 1.75, 0, Math.PI * 2);
          ctx.fill();
        } else if (point.colorIndex === 1 && !coarsePointer) {
          const glowAlpha = Math.min(baseAlpha * 0.16, 0.1);
          ctx.fillStyle = `rgba(58, 58, 64, ${glowAlpha})`;
          ctx.beginPath();
          ctx.arc(point.x, point.y, point.radius * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const animate = () => {
      if (!isPageVisible) {
        rafId = requestAnimationFrame(animate);
        return;
      }

      targetScroll = getScrollNormalized();
      smoothScroll = lerp(smoothScroll, targetScroll, SCROLL_LERP);
      smoothMouseX = lerp(smoothMouseX, targetMouseX, MOUSE_LERP);
      smoothMouseY = lerp(smoothMouseY, targetMouseY, MOUSE_LERP);
      pointerInfluence = lerp(pointerInfluence, 0, 0.08);

      for (let i = 0; i < stars.length; i += 1) {
        const star = stars[i];
        star.vx = lerp(star.vx, star.driftX, 0.02);
        star.vy = lerp(star.vy, star.driftY, 0.02);

        if (pointerInfluence > 0.01) {
          const dx = star.x - pointerX;
          const dy = star.y - pointerY;
          const distSq = dx * dx + dy * dy;

          if (distSq > 1 && distSq < REPULSE_RADIUS_SQ) {
            const dist = Math.sqrt(distSq);
            const strength = (1 - dist / REPULSE_RADIUS) * REPULSE_FORCE * pointerInfluence * (0.65 + star.depth);
            const invDist = 1 / dist;
            star.vx += dx * invDist * strength;
            star.vy += dy * invDist * strength;
          }
        }

        star.vx = clamp(star.vx, -MAX_SPEED, MAX_SPEED);
        star.vy = clamp(star.vy, -MAX_SPEED, MAX_SPEED);
        star.x = wrapForSpace(star.x + star.vx, width);
        star.y = wrapForSpace(star.y + star.vy, height);
      }

      drawFrame(true);
      rafId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      updateSizing();
      if (staticMode) {
        drawFrame(false);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (width <= 0 || height <= 0) return;
      targetMouseX = event.clientX / width - 0.5;
      targetMouseY = event.clientY / height - 0.5;
      pointerX = event.clientX;
      pointerY = event.clientY;
      pointerInfluence = 1;
    };

    const handlePointerLeave = () => {
      targetMouseX = 0;
      targetMouseY = 0;
      pointerInfluence = 0;
    };

    const handleVisibilityChange = () => {
      isPageVisible = document.visibilityState === 'visible';
    };

    updateSizing();

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    if (trackPointer) {
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
      window.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    }

    if (staticMode) {
      drawFrame(false);
    } else {
      rafId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [coarsePointer, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[3]"
      style={{ opacity: 1 }}
    />
  );
}
