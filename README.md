# Teran Sarathchandra Portfolio

Personal portfolio built with Next.js App Router, TypeScript, Tailwind CSS v4, Framer Motion, Lenis, and React Three Fiber.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run start
npm run lint
```

## Stack

- next `16.1.6`
- react / react-dom `19.2.3`
- typescript `^5`
- tailwindcss `^4`
- framer-motion `^12.34.0`
- lenis `^1.3.17`
- @react-three/fiber `^9.5.0`
- @react-three/drei `^10.7.7`
- three `^0.183.0`

## Content Source

Portfolio content is centralized in:

`src/content/portfolio.ts`

This file defines personal info, social links, skills, projects, experience, and nav items used across the site.

## Routes

- `/` home page with sections: Hero, About, Skills, Projects, Experience, Contact, Footer
- `/projects` projects listing page
- `/blog` placeholder page
- `/resume` placeholder page
- custom not found page at `src/app/not-found.tsx`

## Notable UI Behavior

- Lenis smooth scrolling via `src/components/providers/SmoothScrollProvider.tsx`
- custom desktop liquid cursor via `src/components/effects/LiquidGlassCursor.tsx`
- client-only 3D mounts in layout:
  - `src/components/effects/Scroll3DSculptureMount.tsx`
  - `src/components/effects/StarMeshBackgroundMount.tsx`
- navigation and section reveal/motion utilities under `src/components/nav` and `src/components/ui`

## Project Structure

```text
src/
  app/
  components/
    effects/
    layout/
    nav/
    providers/
    sections/
    ui/
  content/
  hooks/
  styles/
public/
```
