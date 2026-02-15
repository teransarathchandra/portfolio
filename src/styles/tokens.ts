/**
 * Design System Tokens
 * Used throughout the app for consistent styling.
 * Mirror these values in globals.css @theme block for Tailwind usage.
 */

export const colors = {
  background: '#121212',
  surface: '#1A1A1D',
  primaryText: '#F5F5F5',
  secondaryText: '#A0A0A8',
  accent: '#C6FF00',
  accentDim: 'rgba(198, 255, 0, 0.15)',
  accentGlow: 'rgba(198, 255, 0, 0.25)',
  gridLine: '#2A2A2E',
  gridLineLight: '#3A3A40',
  border: 'rgba(42, 42, 46, 0.6)',
} as const;

export const fonts = {
  sans: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
  mono: 'var(--font-geist-mono), ui-monospace, monospace',
} as const;

export const spacing = {
  sectionY: 'py-24 md:py-32',
  containerX: 'px-4 sm:px-6 lg:px-8',
} as const;

export const animation = {
  /** Default transition for interactive elements */
  fast: 'transition-all duration-200 ease-out',
  /** Section reveal animation duration (ms) */
  revealDuration: 0.6,
  /** Stagger delay between children (s) */
  staggerDelay: 0.08,
} as const;

export type ColorKey = keyof typeof colors;
