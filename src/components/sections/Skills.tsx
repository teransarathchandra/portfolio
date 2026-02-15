import { skillGroups } from '@/content/portfolio';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import Reveal from '@/components/ui/Reveal';
import SkillTags from './SkillTags';

export default function Skills() {
  return (
    <Section id="skills">
      <Container>
        <Reveal>
          <p className="mb-2 font-mono text-sm tracking-widest uppercase text-accent">What I work with</p>
          <h2 id="skills-heading" className="mb-12 text-3xl font-bold text-primary-text sm:text-4xl">
            Skills &amp; Technologies
          </h2>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.category} delay={gi * 0.1}>
              <div className="rounded-2xl border border-border bg-surface p-6">
                <h3 className="mb-4 text-lg font-semibold text-primary-text">
                  {group.category}
                </h3>
                <SkillTags skills={group.skills} />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
