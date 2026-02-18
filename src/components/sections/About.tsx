import { personalInfo } from '@/content/portfolio';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';

export default function About() {
  return (
    <Section id="about" bg="surface" fullHeight>
      <Container>
        <div className="grid gap-12 md:grid-cols-2 md:items-start md:gap-16">
          {/* Avatar placeholder */}
          <Reveal direction="left">
            <div className="relative mx-auto aspect-square w-64 overflow-hidden rounded-2xl border border-border md:sticky md:top-24 md:mx-0 md:w-full md:max-w-sm">
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface to-background">
                <span className="text-6xl font-bold text-accent/20" aria-hidden="true">
                  {personalInfo.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </span>
              </div>
              {/* Accent corner */}
              <div className="absolute -bottom-px -right-px h-16 w-16 rounded-tl-2xl border-t border-l border-accent/30" aria-hidden="true" />
            </div>
          </Reveal>

          {/* Text */}
          <div>
            <Reveal>
              <p className="mb-2 font-mono text-sm tracking-widest uppercase text-accent">About me</p>
              <h2 id="about-heading" className="mb-6 text-3xl font-bold text-primary-text sm:text-4xl">
                Building the web,{' '}
                <span className="text-accent">one pixel at a time</span>
              </h2>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="space-y-4 text-secondary-text leading-relaxed">
                <p>{personalInfo.bio}</p>
                <p>
                  My sweet spot is the gap between design and engineering — where decisions
                  about component APIs, token systems, and render performance directly shape
                  what users see and feel. I&apos;ve shipped across greenfield startups and
                  established platform teams, and I&apos;ve learned that clarity beats
                  cleverness every time.
                </p>
                <p>
                  Outside work: open-source tinkering, pixel-art experiments, and the
                  occasional very long hike.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-8 grid grid-cols-3 gap-4 text-sm">
                <div className="rounded-xl border border-border bg-background p-4 text-center">
                  <span className="block font-mono font-bold text-2xl text-accent">5+</span>
                  <p className="mt-1 text-secondary-text text-xs leading-snug">Years building for production</p>
                </div>
                <div className="rounded-xl border border-border bg-background p-4 text-center">
                  <span className="block font-mono font-bold text-2xl text-accent">20+</span>
                  <p className="mt-1 text-secondary-text text-xs leading-snug">Projects shipped</p>
                </div>
                <div className="rounded-xl border border-border bg-background p-4 text-center">
                  <span className="block font-mono font-bold text-2xl text-accent">3</span>
                  <p className="mt-1 text-secondary-text text-xs leading-snug">Open-source libs maintained</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.35}>
              <div className="mt-8 flex flex-wrap justify-center gap-3 sm:justify-start">
                <Button href="#contact" size="md">Work With Me</Button>
                <Button href="#projects" variant="secondary" size="md">See My Work</Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
