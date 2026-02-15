'use client';

import { motion } from 'framer-motion';
import type { Skill } from '@/content/portfolio';
import StaggerContainer from '@/components/ui/StaggerContainer';

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

interface SkillTagsProps {
  skills: Skill[];
}

export default function SkillTags({ skills }: SkillTagsProps) {
  return (
    <StaggerContainer className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <motion.span
          key={skill.name}
          variants={itemVariants}
          className="rounded-full border border-border bg-background px-3 py-1.5 text-sm text-secondary-text transition-colors hover:border-accent/30 hover:text-accent"
        >
          {skill.name}
        </motion.span>
      ))}
    </StaggerContainer>
  );
}
