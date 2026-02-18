import Container from '@/components/layout/Container';

export const metadata = {
  title: 'Resume — Teran Sarathchandra',
  description: 'Professional resume of Teran Sarathchandra, Software Engineer.',
};

export default function ResumePage() {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-background/88 pt-16 pb-16">
      <Container>
        <p className="mb-2 font-mono text-sm tracking-widest uppercase text-accent">Resume</p>
        <h1 className="mb-8 text-3xl font-bold text-primary-text sm:text-4xl">
          Professional Resume
        </h1>
        <div className="rounded-2xl border border-border bg-surface p-8">
          <p className="text-secondary-text">
            Resume page — upload your PDF or add content here.
          </p>
        </div>
      </Container>
    </div>
  );
}
