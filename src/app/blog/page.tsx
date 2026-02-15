import Container from '@/components/layout/Container';

export const metadata = {
  title: 'Blog — Teran Sarathchandra',
  description: 'Thoughts on web development, design systems, and engineering.',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <Container>
        <p className="mb-2 font-mono text-sm text-accent">Blog</p>
        <h1 className="mb-8 text-3xl font-bold text-primary-text sm:text-4xl">
          Blog
        </h1>
        <div className="rounded-2xl border border-border bg-surface p-8">
          <p className="text-secondary-text">
            Blog posts coming soon. Check back later!
          </p>
        </div>
      </Container>
    </div>
  );
}
