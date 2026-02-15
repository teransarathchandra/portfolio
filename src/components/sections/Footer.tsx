import { personalInfo, socialLinks } from '@/content/portfolio';
import Container from '@/components/layout/Container';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-8" role="contentinfo">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-secondary-text">
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>

          <nav aria-label="Social links">
            <div className="flex items-center gap-4">
              {socialLinks.map(({ label, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-secondary-text transition-colors hover:text-accent"
                >
                  {label}
                </a>
              ))}
            </div>
          </nav>
        </div>

        <p className="mt-4 text-center text-xs text-secondary-text/50">
          Designed &amp; built with Next.js, Tailwind CSS, and Framer Motion.
        </p>
      </Container>
    </footer>
  );
}
