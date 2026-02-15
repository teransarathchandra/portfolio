'use client';

import { ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  once?: boolean;
}

const getVariants = (direction: RevealProps['direction']): Variants => {
  const offset = 30;
  const translate: Record<string, { x?: number; y?: number }> = {
    up: { y: offset },
    down: { y: -offset },
    left: { x: offset },
    right: { x: -offset },
    none: {},
  };

  return {
    hidden: { opacity: 0, ...translate[direction ?? 'up'] },
    visible: { opacity: 1, x: 0, y: 0 },
  };
};

export default function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  once = true,
}: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={getVariants(direction)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      {children}
    </motion.div>
  );
}
