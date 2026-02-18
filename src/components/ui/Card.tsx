import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Card — composable surface primitive.
 * Hover lift is always on; suppress via `[&]:hover:translate-y-0` in className if needed.
 */
export default function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-border bg-surface p-6 transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-accent/20 hover:shadow-lg hover:shadow-accent-glow/5 ${className}`}
    >
      {children}
    </div>
  );
}
