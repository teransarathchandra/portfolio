import { personalInfo, socialLinks } from '@/content/portfolio';
import Container from '@/components/layout/Container';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background py-8">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-secondary-text">
            &copy; {year} {personalInfo.name}. All rights reserved.
          </p>

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
        </div>

        <p className="mt-4 text-center text-xs text-secondary-text/50">
          Designed & built with Next.js, Tailwind CSS, and Framer Motion.
        </p>
      </Container>
    </footer>
  );
}
