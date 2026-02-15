import { projects } from '@/content/portfolio';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import { GitHubIcon, ExternalLinkIcon } from '@/components/ui/Icons';

export default function Projects() {
  return (
    <Section id="projects" bg="surface">
      <Container>
        <Reveal>
          <p className="mb-2 font-mono text-sm tracking-widest uppercase text-accent">What I&apos;ve built</p>
          <h2 id="projects-heading" className="mb-12 text-3xl font-bold text-primary-text sm:text-4xl">
            Featured Projects
          </h2>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.1}>
              <Card className="flex h-full flex-col">
                {/* Thumbnail placeholder */}
                <div className="mb-5 aspect-video w-full overflow-hidden rounded-xl border border-border bg-background">
                  <div className="flex h-full items-center justify-center">
                    <span className="font-mono text-sm text-grid-line-light" aria-hidden="true">
                      {project.title}
                    </span>
                  </div>
                </div>

                <h3 className="mb-2 text-xl font-semibold text-primary-text">
                  {project.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-secondary-text">
                  {project.description}
                </p>

                {/* Highlights */}
                <ul className="mb-4 space-y-1.5">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-secondary-text">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Stack badges */}
                <div className="mb-5 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>

                {/* Links */}
                <div className="mt-auto flex items-center gap-3 border-t border-border pt-4">
                  {project.github && (
                    <Button
                      href={project.github}
                      variant="ghost"
                      size="sm"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} source on GitHub`}
                    >
                      <GitHubIcon className="h-4 w-4" />
                      Code
                    </Button>
                  )}
                  {project.live && (
                    <Button
                      href={project.live}
                      variant="secondary"
                      size="sm"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} live demo`}
                    >
                      <ExternalLinkIcon />
                      Live
                    </Button>
                  )}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
