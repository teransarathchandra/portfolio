import { personalInfo, socialLinks } from '@/content/portfolio';
import Container from '@/components/layout/Container';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background/88 py-10" role="contentinfo">
      <Container>
        {/* Mini CTA */}
        <div className="mb-8 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-sm text-secondary-text">
            Available for new opportunities &mdash;{' '}
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-accent underline-offset-2 hover:underline transition-colors"
            >
              {personalInfo.email}
            </a>
          </p>
          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-flex items-center gap-2 rounded-lg border border-accent/30 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/[0.08] hover:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
          >
            Get in touch ↗
          </a>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-sm text-secondary-text">
            &copy; {year} {personalInfo.name}. All rights reserved.
          </p>

          <nav aria-label="Social links">
            <ul className="flex items-center gap-1">
              {socialLinks.map(({ label, url }) => (
                <li key={label}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg px-3 py-2 text-sm text-secondary-text transition-colors hover:text-accent hover:bg-white/5 inline-flex items-center min-h-[36px]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-4 text-center text-xs text-secondary-text/40">
          Designed &amp; built with Next.js, Tailwind CSS, and Framer Motion.
        </p>
      </Container>
    </footer>
  );
}
