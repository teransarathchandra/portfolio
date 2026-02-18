import { projects } from '@/content/portfolio';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import { GitHubIcon, ExternalLinkIcon } from '@/components/ui/Icons';

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <Section id="projects" bg="surface" fullHeight>
      <Container>
        <Reveal>
          <p className="mb-2 font-mono text-sm tracking-widest uppercase text-accent">What I&apos;ve built</p>
          <h2 id="projects-heading" className="mb-3 text-3xl font-bold text-primary-text sm:text-4xl">
            Featured Projects
          </h2>
          <p className="mb-12 max-w-2xl text-secondary-text leading-relaxed">
            A selection of products and tools I&apos;ve shipped — each starting with a real problem.
          </p>
        </Reveal>

        {/* Featured grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.08}>
              <Card className="group flex h-full flex-col">
                {/* Thumbnail */}
                <div className="relative mb-5 aspect-video w-full overflow-hidden rounded-xl border border-border bg-background">
                  <div
                    className="flex h-full items-center justify-center"
                    style={{
                      backgroundImage: `radial-gradient(ellipse at 30% 50%, var(--accent-glow, rgba(198,255,0,0.06)) 0%, transparent 70%), radial-gradient(ellipse at 75% 20%, rgba(198,255,0,0.03) 0%, transparent 60%)`,
                    }}
                  >
                    <span
                      className="font-mono text-5xl font-bold text-accent/10 select-none"
                      aria-hidden="true"
                    >
                      {project.title.charAt(0)}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-accent/0 transition-colors duration-300 group-hover:bg-accent/[0.03]" aria-hidden="true" />
                </div>

                {/* One-liner */}
                {project.oneLiner && (
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent/70">
                    {project.oneLiner}
                  </p>
                )}

                <h3 className="mb-2 text-xl font-semibold text-primary-text">
                  {project.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-secondary-text">
                  {project.description}
                </p>

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
                      className="border border-border"
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
                      Live demo
                    </Button>
                  )}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        {/* Non-featured projects — compact list */}
        {rest.length > 0 && (
          <Reveal delay={0.2}>
            <div className="mt-10">
              <h3 className="mb-4 text-sm font-mono uppercase tracking-widest text-secondary-text">
                Other projects
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {rest.map((project) => (
                  <div
                    key={project.title}
                    className="rounded-xl border border-border bg-surface p-5 flex flex-col gap-3"
                  >
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-accent/70 mb-1">
                        {project.oneLiner ?? project.title}
                      </p>
                      <h4 className="font-semibold text-primary-text">{project.title}</h4>
                      <p className="mt-1 text-sm text-secondary-text leading-relaxed">{project.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 4).map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-secondary-text hover:text-accent transition-colors underline-offset-2 hover:underline"
                          aria-label={`${project.title} source code`}
                        >
                          GitHub ↗
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-accent hover:text-accent/80 transition-colors underline-offset-2 hover:underline"
                          aria-label={`${project.title} live demo`}
                        >
                          Live demo ↗
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* End-of-projects CTA */}
        <Reveal delay={0.25}>
          <div className="mt-14 rounded-2xl border border-border bg-background px-6 py-8 text-center sm:px-10">
            <p className="mb-1 text-sm font-mono uppercase tracking-widest text-accent">Next step</p>
            <h3 className="mb-3 text-xl font-bold text-primary-text sm:text-2xl">
              Want something like this?
            </h3>
            <p className="mb-6 text-secondary-text leading-relaxed max-w-md mx-auto">
              I&apos;m open to full-time roles, contract work, and interesting side projects.
              Let&apos;s figure out if we&apos;re a good fit.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button href="#contact" size="lg">
                Let&apos;s Talk
              </Button>
              <Button href="https://github.com" variant="secondary" size="lg" target="_blank" rel="noopener noreferrer">
                View GitHub
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

