'use client';

import { skillGroups } from '@/content/portfolio';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import Reveal from '@/components/ui/Reveal';
import StaggerContainer from '@/components/ui/StaggerContainer';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Skills() {
  return (
    <Section id="skills">
      <Container>
        <Reveal>
          <p className="mb-2 font-mono text-sm text-accent">What I work with</p>
          <h2 id="skills-heading" className="mb-12 text-3xl font-bold text-primary-text sm:text-4xl">
            Skills & Technologies
          </h2>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.category} delay={gi * 0.1}>
              <div className="rounded-2xl border border-border bg-surface p-6">
                <h3 className="mb-4 text-lg font-semibold text-primary-text">
                  {group.category}
                </h3>
                <StaggerContainer className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <motion.span
                      key={skill.name}
                      variants={itemVariants}
                      className="rounded-full border border-border bg-background px-3 py-1.5 text-sm text-secondary-text transition-colors hover:border-accent/30 hover:text-accent"
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </StaggerContainer>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
