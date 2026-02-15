import Container from '@/components/layout/Container';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Container className="text-center">
        <p className="mb-2 font-mono text-sm text-accent">404</p>
        <h1 className="mb-4 text-4xl font-bold text-primary-text">
          Page not found
        </h1>
        <p className="mb-8 text-secondary-text">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button href="/">Back to home</Button>
      </Container>
    </div>
  );
}
