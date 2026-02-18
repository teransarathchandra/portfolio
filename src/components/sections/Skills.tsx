import { skillGroups } from '@/content/portfolio';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import Reveal from '@/components/ui/Reveal';
import SkillTags from './SkillTags';

export default function Skills() {
  return (
    <Section id="skills" fullHeight>
      <Container>
        <Reveal>
          <p className="mb-2 font-mono text-sm tracking-widest uppercase text-accent">What I work with</p>
          <h2 id="skills-heading" className="mb-3 text-3xl font-bold text-primary-text sm:text-4xl">
            Skills &amp; Technologies
          </h2>
          <p className="mb-12 max-w-xl text-secondary-text leading-relaxed">
            Tools and technologies I use regularly — from rapid prototyping to production.
          </p>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-3 items-stretch">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.category} delay={gi * 0.1} className="flex">
              <div className="flex-1 flex flex-col rounded-2xl border border-border bg-surface p-6">
                <h3 className="mb-4 text-lg font-semibold text-primary-text">
                  {group.category}
                </h3>
                <div className="flex-1">
                  <SkillTags skills={group.skills} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
