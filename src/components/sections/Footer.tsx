import { personalInfo, socialLinks } from '@/content/portfolio';
import Container from '@/components/layout/Container';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background py-10" role="contentinfo">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
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

        <p className="mt-6 text-center text-xs text-secondary-text/40">
          Designed &amp; built with Next.js, Tailwind CSS, and Framer Motion.
        </p>
      </Container>
    </footer>
  );
}
