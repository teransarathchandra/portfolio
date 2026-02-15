'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { personalInfo, socialLinks } from '@/content/portfolio';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import Container from '@/components/layout/Container';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import { SocialIcon } from '@/components/ui/Icons';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const blob1Y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const blob3Y = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden bg-background pt-16"
      aria-labelledby="hero-heading"
    >
      {/* Parallax blobs */}
      {!reduced && (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <motion.div
            style={{ y: blob1Y }}
            className="absolute -top-20 -left-20 h-[500px] w-[500px] rounded-full bg-accent/[0.04] blur-[100px]"
          />
          <motion.div
            style={{ y: blob2Y }}
            className="absolute top-1/3 -right-32 h-[400px] w-[400px] rounded-full bg-accent/[0.03] blur-[80px]"
          />
          <motion.div
            style={{ y: blob3Y }}
            className="absolute -bottom-10 left-1/3 h-[300px] w-[300px] rounded-full bg-accent/[0.02] blur-[60px]"
          />
          {/* Decorative outlined circle */}
          <motion.div
            style={{ y: blob1Y }}
            className="absolute top-20 right-20 h-48 w-48 rounded-full border border-grid-line-light/30 md:h-72 md:w-72"
          />
          <motion.div
            style={{ y: blob2Y }}
            className="absolute bottom-32 left-16 h-32 w-32 rounded-full border border-grid-line/20"
          />
        </div>
      )}

      <Container className="relative z-10">
        <div className="max-w-3xl">
          <Reveal delay={0.1}>
            <p className="mb-4 font-mono text-sm tracking-widest uppercase text-accent">
              Hi, my name is
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <h1
              id="hero-heading"
              className="mb-4 text-4xl font-bold tracking-tight text-primary-text sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]"
            >
              {personalInfo.name}
              <span className="text-accent">.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mb-6 text-xl font-medium text-secondary-text sm:text-2xl md:text-3xl leading-snug">
              {personalInfo.role}
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="mb-10 max-w-xl text-base leading-relaxed text-secondary-text sm:text-lg">
              {personalInfo.bio}
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="flex flex-wrap items-center gap-4">
              <Button href="#projects" size="lg">
                View my work
              </Button>
              <Button href="#contact" variant="secondary" size="lg">
                Get in touch
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.6}>
            <div className="mt-12 flex items-center gap-5">
              {socialLinks.map(({ label, url, icon }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-2.5 text-secondary-text transition-colors hover:text-accent hover:bg-white/5"
                  aria-label={label}
                >
                  <SocialIcon icon={icon} />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
