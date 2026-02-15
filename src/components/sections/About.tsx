'use client';

import { personalInfo } from '@/content/portfolio';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import Reveal from '@/components/ui/Reveal';

export default function About() {
  return (
    <Section id="about" bg="surface">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {/* Avatar placeholder */}
          <Reveal direction="left">
            <div className="relative mx-auto aspect-square w-64 overflow-hidden rounded-2xl border border-border md:mx-0 md:w-full md:max-w-sm">
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface to-background">
                <span className="text-6xl font-bold text-accent/20">
                  {personalInfo.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </span>
              </div>
              {/* Accent corner */}
              <div className="absolute -bottom-px -right-px h-16 w-16 rounded-tl-2xl border-t border-l border-accent/30" />
            </div>
          </Reveal>

          {/* Text */}
          <div>
            <Reveal>
              <p className="mb-2 font-mono text-sm text-accent">About me</p>
              <h2 id="about-heading" className="mb-6 text-3xl font-bold text-primary-text sm:text-4xl">
                Building the web,{' '}
                <span className="text-accent">one pixel at a time</span>
              </h2>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="space-y-4 text-secondary-text leading-relaxed">
                <p>{personalInfo.bio}</p>
                <p>
                  When I&apos;m not coding, you can find me exploring design systems,
                  contributing to open-source projects, and mentoring early-career
                  developers. I believe great software is built at the intersection
                  of solid engineering and thoughtful design.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-6 flex flex-wrap gap-6 text-sm">
                <div>
                  <span className="text-accent font-mono font-bold text-2xl">5+</span>
                  <p className="mt-1 text-secondary-text">Years Experience</p>
                </div>
                <div>
                  <span className="text-accent font-mono font-bold text-2xl">20+</span>
                  <p className="mt-1 text-secondary-text">Projects Shipped</p>
                </div>
                <div>
                  <span className="text-accent font-mono font-bold text-2xl">10+</span>
                  <p className="mt-1 text-secondary-text">Happy Clients</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
