'use client';

import { useState, FormEvent } from 'react';
import { personalInfo, socialLinks } from '@/content/portfolio';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Fallback to mailto
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
  };

  return (
    <Section id="contact" bg="surface">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="mb-2 font-mono text-sm text-accent">Get in touch</p>
            <h2 id="contact-heading" className="mb-4 text-3xl font-bold text-primary-text sm:text-4xl">
              Let&apos;s work together
            </h2>
            <p className="mb-10 text-secondary-text">
              Have a project in mind or just want to chat? Drop me a message and
              I&apos;ll get back to you as soon as I can.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-primary-text">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-primary-text placeholder-secondary-text/50 transition-colors focus:border-accent/40 focus:outline-none focus:ring-1 focus:ring-accent/30"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-primary-text">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-primary-text placeholder-secondary-text/50 transition-colors focus:border-accent/40 focus:outline-none focus:ring-1 focus:ring-accent/30"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-primary-text">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-primary-text placeholder-secondary-text/50 transition-colors focus:border-accent/40 focus:outline-none focus:ring-1 focus:ring-accent/30"
                  placeholder="Tell me about your project..."
                />
              </div>
              <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row">
                <Button type="submit" size="lg">
                  Send message
                </Button>
                <span className="text-sm text-secondary-text">
                  or email me directly at{' '}
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:decoration-accent"
                  >
                    {personalInfo.email}
                  </a>
                </span>
              </div>
            </form>
          </Reveal>

          {/* Social links */}
          <Reveal delay={0.25}>
            <div className="mt-12 flex items-center justify-center gap-4">
              {socialLinks.map(({ label, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg px-3 py-2 text-sm text-secondary-text transition-colors hover:text-accent"
                >
                  {label}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
