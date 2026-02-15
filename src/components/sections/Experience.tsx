import { experience } from '@/content/portfolio';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import Reveal from '@/components/ui/Reveal';

export default function Experience() {
  return (
    <Section id="experience">
      <Container>
        <Reveal>
          <p className="mb-2 font-mono text-sm tracking-widest uppercase text-accent">Where I&apos;ve worked</p>
          <h2 id="experience-heading" className="mb-12 text-3xl font-bold text-primary-text sm:text-4xl">
            Experience
          </h2>
        </Reveal>

        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute top-0 left-4 h-full w-px bg-gradient-to-b from-accent/40 via-grid-line to-transparent md:left-1/2"
            aria-hidden="true"
          />

          <div className="space-y-12">
            {experience.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <Reveal key={`${exp.company}-${exp.period}`} delay={i * 0.1}>
                  <div className="relative flex flex-col md:flex-row md:items-start">
                    {/* Timeline dot */}
                    <div
                      className="absolute left-4 top-1 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-accent bg-background md:left-1/2"
                      aria-hidden="true"
                    />

                    {/* Content */}
                    <div
                      className={`ml-10 w-full md:ml-0 md:w-[calc(50%-2rem)] ${
                        isLeft ? 'md:mr-auto md:pr-8 md:text-right' : 'md:ml-auto md:pl-8'
                      }`}
                    >
                      <span className="font-mono text-xs tracking-wider text-accent">{exp.period}</span>
                      <h3 className="mt-1 text-lg font-semibold text-primary-text">
                        {exp.role}
                      </h3>
                      <p className="text-sm font-medium text-secondary-text">
                        {exp.company}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-secondary-text">
                        {exp.description}
                      </p>
                      <ul className={`mt-3 space-y-1 ${isLeft ? 'md:ml-auto' : ''}`}>
                        {exp.highlights.map((h) => (
                          <li
                            key={h}
                            className={`flex items-start gap-2 text-sm text-secondary-text ${
                              isLeft ? 'md:flex-row-reverse md:text-right' : ''
                            }`}
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent/60" aria-hidden="true" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
