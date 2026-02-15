import { ReactNode } from 'react';

type BgVariant = 'default' | 'surface' | 'transparent';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  bg?: BgVariant;
  /** When true, section gets min-h-screen with flex centering */
  fullHeight?: boolean;
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
  fullHeight = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative py-24 md:py-32 ${bgMap[bg]} ${
        fullHeight ? 'min-h-screen flex flex-col justify-center' : ''
      } ${className}`}
      aria-labelledby={`${id}-heading`}
    >
      {children}
    </section>
  );
}
