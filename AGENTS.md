<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-rules -->
# Iwacu Chef — Project Rules

Before writing any code, read `docs/rules.md`, `docs/architecture.md`, and `docs/branding.md` in full.

Key conventions:
- **Server Components by default** — `'use client'` only for interactivity
- **`params` and `searchParams` are Promises** — always `await`
- **No `next build` linting** — lint runs via `npm run lint`
- **Mobile-first, accessibility-first** — WCAG 2.1 AA
- **TypeScript strict** — no `any`, no `@ts-ignore`
- **Export named, not default** — for utilities and non-page components
<!-- END:project-rules -->
