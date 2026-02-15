import Container from '@/components/layout/Container';
import { projects } from '@/content/portfolio';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'Projects — Teran Sarathchandra',
  description: 'A showcase of projects by Teran Sarathchandra.',
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <Container>
        <p className="mb-2 font-mono text-sm tracking-widest uppercase text-accent">All projects</p>
        <h1 className="mb-12 text-3xl font-bold text-primary-text sm:text-4xl">
          Projects
        </h1>

        <div className="space-y-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className="rounded-2xl border border-border bg-surface p-6 transition-[border-color] duration-200 hover:border-grid-line-light"
            >
              <h2 className="mb-2 text-xl font-semibold text-primary-text">
                {project.title}
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-secondary-text">{project.description}</p>
              <div className="mb-4 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
              <ul className="mb-4 space-y-1.5">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-secondary-text">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3">
                {project.github && (
                  <Button href={project.github} variant="ghost" size="sm" target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} on GitHub`}>
                    GitHub
                  </Button>
                )}
                {project.live && (
                  <Button href={project.live} variant="secondary" size="sm" target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} live demo`}>
                    Live Demo
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
