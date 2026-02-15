import { ReactNode } from 'react';

type BgVariant = 'default' | 'surface' | 'transparent';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  bg?: BgVariant;
}

const bgMap: Record<BgVariant, string> = {
  default: 'bg-background',
  surface: 'bg-surface',
  transparent: 'bg-transparent',
};

export default function Section({
  id,
  children,
  className = '',
  bg = 'default',
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative py-24 md:py-32 ${bgMap[bg]} ${className}`}
      aria-labelledby={`${id}-heading`}
    >
      {children}
    </section>
  );
}
