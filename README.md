# Developer Portfolio

A production-grade developer portfolio built with **Next.js 16** (App Router), **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**.

## Quick Start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # Production build
npm run start      # Serve production build
```

## Edit Content

All site content is driven from a single file:

```
src/content/portfolio.ts
```

Update your **name, bio, skills, projects, experience, and social links** there — every component reads from this config.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout, metadata, providers
│   ├── page.tsx             # Home (single-page portfolio)
│   ├── not-found.tsx        # 404 page
│   ├── blog/page.tsx        # Blog placeholder
│   ├── projects/page.tsx    # Projects listing route
│   ├── resume/page.tsx      # Resume placeholder
│   └── globals.css          # Tailwind + design tokens + utilities
├── components/
│   ├── layout/              # Container, Section, GridOverlay
│   ├── nav/                 # Navbar, MobileMenu
│   ├── providers/           # SmoothScrollProvider (Lenis)
│   ├── sections/            # Hero, About, Skills, Projects, Experience, Contact, Footer
│   └── ui/                  # Button, Badge, Card, Reveal, StaggerContainer
├── content/
│   └── portfolio.ts         # All site data (edit this!)
├── hooks/
│   ├── useActiveSection.ts  # IntersectionObserver-based active section
│   └── useReducedMotion.ts  # Respects prefers-reduced-motion
└── styles/
    └── tokens.ts            # Design system tokens (JS reference)
```

## Design System

| Token           | Value                     | Usage                              |
|-----------------|---------------------------|------------------------------------|
| Background      | `#121212`                 | Page background                    |
| Surface         | `#1A1A1D`                 | Cards, alternate sections          |
| Primary Text    | `#F5F5F5`                 | Headings, body text                |
| Secondary Text  | `#A0A0A8`                 | Descriptions, muted text           |
| Accent (Neon)   | `#C6FF00`                 | Buttons, links, highlights only    |
| Grid Lines      | `#2A2A2E` / `#3A3A40`    | Subtle grid overlay, borders       |

**70/20/10 rule**: 70% dark background, 20% surface/text, 10% neon accent.

## Key Features

- **Parallax**: Subtle `useScroll` + `useTransform` on hero decorative blobs only
- **Animations**: `whileInView` reveal triggers via Framer Motion
- **Smooth scroll**: Lenis integration, auto-disabled when `prefers-reduced-motion`
- **Accessibility**: Focus states, semantic HTML, keyboard nav, ARIA landmarks
- **Performance**: CSS-first effects, no raw scroll listeners, static generation
- **Responsive**: Mobile-first, collapsible navbar with animated hamburger

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Lenis (smooth scroll)

## Deploy

Deploy to [Vercel](https://vercel.com) with zero config, or any Node.js host.
