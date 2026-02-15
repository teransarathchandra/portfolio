'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { personalInfo, socialLinks } from '@/content/portfolio';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';

type FormStatus = 'idle' | 'sending' | 'sent';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Fallback to mailto
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );
    globalThis.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    // Reset after brief delay (mailto opens externally)
    setTimeout(() => {
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
    }, 500);
  };

  return (
    <Section id="contact" bg="surface" fullHeight>
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="mb-2 font-mono text-sm tracking-widest uppercase text-accent">Get in touch</p>
            <h2 id="contact-heading" className="mb-4 text-3xl font-bold text-primary-text sm:text-4xl">
              Let&apos;s work together
            </h2>
            <p className="mb-10 text-secondary-text leading-relaxed">
              Have a project in mind or just want to chat? Drop me a message and
              I&apos;ll get back to you as soon as I can.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            {status === 'sent' ? (
              <output className="block rounded-2xl border border-accent/30 bg-accent-dim p-8 text-center">
                <p className="text-lg font-medium text-primary-text mb-2">Message ready!</p>
                <p className="text-sm text-secondary-text">
                  Your email client should have opened. If it didn&apos;t, email me directly at{' '}
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:decoration-accent"
                  >
                    {personalInfo.email}
                  </a>
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 text-sm text-accent underline underline-offset-2 hover:text-accent/80 transition-colors"
                >
                  Send another message
                </button>
              </output>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-left" noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-primary-text">
                      Name <span className="text-accent" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-primary-text placeholder-secondary-text/50 transition-[border-color,box-shadow] duration-200 focus:border-accent/40 focus:outline-none focus:ring-2 focus:ring-accent/20"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-primary-text">
                      Email <span className="text-accent" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      autoComplete="email"
                      spellCheck={false}
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-primary-text placeholder-secondary-text/50 transition-[border-color,box-shadow] duration-200 focus:border-accent/40 focus:outline-none focus:ring-2 focus:ring-accent/20"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-primary-text">
                    Message <span className="text-accent" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    autoComplete="off"
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-primary-text placeholder-secondary-text/50 transition-[border-color,box-shadow] duration-200 focus:border-accent/40 focus:outline-none focus:ring-2 focus:ring-accent/20"
                    placeholder="Tell me about your project…"
                  />
                </div>
                <div className="flex flex-col items-center gap-5 pt-4">
                  <Button type="submit" size="lg" className="w-full sm:w-auto sm:min-w-[200px]" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Opening mail…' : 'Send message'}
                  </Button>
                  <p className="text-sm text-secondary-text">
                    or email me directly at{' '}
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:decoration-accent"
                    >
                      {personalInfo.email}
                    </a>
                  </p>
                </div>
              </form>
            )}
          </Reveal>

          {/* Social links */}
          <Reveal delay={0.25}>
            <div className="mt-12 flex items-center justify-center gap-1">
              {socialLinks.map(({ label, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg px-3.5 py-2.5 text-sm text-secondary-text transition-colors hover:text-accent hover:bg-white/5 min-h-[40px] inline-flex items-center"
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
