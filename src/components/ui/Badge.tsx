import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export default function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-accent/25 bg-accent-dim px-3 py-1 text-xs font-medium tracking-wide text-accent ${className}`}
    >
      {children}
    </span>
  );
}
