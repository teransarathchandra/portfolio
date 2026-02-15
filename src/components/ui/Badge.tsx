import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export default function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-block rounded-full bg-accent-dim px-3 py-1 text-xs font-medium text-accent ${className}`}
    >
      {children}
    </span>
  );
}
