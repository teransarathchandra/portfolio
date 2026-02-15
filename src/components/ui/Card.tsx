import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-border bg-surface p-6 ${
        hover
          ? 'transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent/20 hover:shadow-lg hover:shadow-accent-glow/5'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
