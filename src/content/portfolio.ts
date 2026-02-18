/* ─── Portfolio Content ─────────────────────────────────
 *  Edit this file to update all site content.
 *  Components render from these exports — no hardcoded copy.
 * ───────────────────────────────────────────────────────── */

export interface SocialLink {
  label: string;
  url: string;
  icon: string; // simple identifier for icon lookup
}

export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillGroup {
  category: string;
  skills: Skill[];
}

export interface Project {
  title: string;
  description: string;
  oneLiner?: string;
  stack: string[];
  highlights: string[];
  featured?: boolean;
  github?: string;
  live?: string;
  thumbnail?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface PersonalInfo {
  name: string;
  role: string;
  tagline?: string;
  location: string;
  bio: string;
  avatar?: string;
  resumeUrl?: string;
  email: string;
}

// ── Personal Info ──────────────────────────────────────

export const personalInfo: PersonalInfo = {
  name: 'Teran Sarathchandra',
  role: 'Software Engineer',
  tagline: 'I turn complex problems into fast, accessible products.',
  location: 'San Francisco, CA',
  bio: `I build performant, accessible web applications with modern tooling.
Passionate about design systems, developer experience, and shipping products
that people love to use.`,
  email: 'hello@teransarathchandra.dev',
  resumeUrl: '/resume',
};

// ── Social Links ───────────────────────────────────────

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', url: 'https://github.com', icon: 'github' },
  { label: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
  { label: 'Twitter / X', url: 'https://x.com', icon: 'twitter' },
];

// ── Skills ─────────────────────────────────────────────

export const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React / Next.js' },
      { name: 'TypeScript' },
      { name: 'Tailwind CSS' },
      { name: 'Framer Motion' },
      { name: 'HTML / CSS' },
      { name: 'Accessibility (a11y)' },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js' },
      { name: 'Python' },
      { name: 'PostgreSQL' },
      { name: 'GraphQL' },
      { name: 'REST APIs' },
      { name: 'Redis' },
    ],
  },
  {
    category: 'DevOps & Tools',
    skills: [
      { name: 'Docker' },
      { name: 'AWS / Vercel' },
      { name: 'CI/CD' },
      { name: 'Git' },
      { name: 'Figma' },
      { name: 'Testing (Jest, Playwright)' },
    ],
  },
];

// ── Projects ───────────────────────────────────────────

export const projects: Project[] = [
  {
    title: 'Synapse Dashboard',
    oneLiner: 'Real-time SaaS analytics platform with drag-and-drop dashboards',
    description:
      'A real-time analytics dashboard for SaaS metrics with customizable widgets, team collaboration, and automated reporting.',
    stack: ['Next.js', 'TypeScript', 'D3.js', 'Supabase', 'Tailwind CSS'],
    highlights: [
      'Real-time WebSocket data streaming',
      'Drag-and-drop widget layout',
      '99.9% uptime over 12 months',
    ],
    github: 'https://github.com',
    live: 'https://example.com',
    featured: true,
  },
  {
    title: 'Verdant',
    oneLiner: 'Open-source accessible design system — 40+ composable primitives',
    description:
      'An open-source design system and component library built for accessibility-first teams, featuring 40+ composable primitives.',
    stack: ['React', 'Storybook', 'Radix UI', 'CSS Modules', 'Changesets'],
    highlights: [
      'WCAG 2.1 AA compliant',
      'Tree-shakeable, under 12 KB gzipped',
      '500+ GitHub stars',
    ],
    github: 'https://github.com',
    live: 'https://example.com',
    featured: true,
  },
  {
    title: 'NomadAPI',
    oneLiner: 'Developer-first API gateway with auto-generated docs',
    description:
      'A developer-friendly REST & GraphQL API gateway with rate limiting, caching, and built-in documentation generation.',
    stack: ['Node.js', 'Express', 'GraphQL', 'Redis', 'Docker'],
    highlights: [
      'Sub-50ms p95 latency',
      'Auto-generated OpenAPI docs',
      'Used by 1,200+ developers',
    ],
    github: 'https://github.com',
    featured: true,
  },
  {
    title: 'Pixel Studio',
    oneLiner: 'Collaborative browser-based pixel art editor with real-time multi-cursor',
    description:
      'A browser-based collaborative pixel art editor with real-time multi-cursor support, layers, and export to spritesheet.',
    stack: ['React', 'Canvas API', 'WebRTC', 'Firebase', 'Tailwind CSS'],
    highlights: [
      'Real-time collaboration for up to 8 users',
      'Custom undo/redo stack',
      'PWA with offline support',
    ],
    github: 'https://github.com',
    live: 'https://example.com',
  },
];

// ── Experience ─────────────────────────────────────────

export const experience: Experience[] = [
  {
    role: 'Senior Frontend Engineer',
    company: 'Acme Corp',
    period: '2023 – Present',
    description:
      'Leading the frontend platform team, building shared component libraries and improving developer experience across 6 product teams.',
    highlights: [
      'Reduced bundle size by 40% through code-splitting and lazy loading',
      'Architected a micro-frontend migration strategy',
      'Mentored 4 junior engineers',
    ],
  },
  {
    role: 'Full-Stack Developer',
    company: 'StartupXYZ',
    period: '2021 – 2023',
    description:
      'Built and shipped customer-facing features for a B2B SaaS product serving 10K+ users.',
    highlights: [
      'Implemented real-time notifications with WebSockets',
      'Designed and built the billing and subscription system',
      'Improved Lighthouse score from 62 to 97',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'Digital Agency Co.',
    period: '2019 – 2021',
    description:
      'Delivered responsive, accessible websites and web apps for clients across fintech, healthcare, and e-commerce.',
    highlights: [
      'Shipped 15+ client projects on time and on budget',
      'Introduced a component-first workflow with Storybook',
      'Led accessibility audits and remediation',
    ],
  },
];

// ── Navigation ─────────────────────────────────────────

export const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
] as const;
