# Project Rules — Iwacu Chef

> **Version:** 0.1.0  
> **Status:** Active  
> **Last Updated:** 2026-07-05

---

## 1. General Principles

1. **Mobile-first** — design and develop for mobile first, then enhance for larger screens.
2. **Accessibility-first** — every component must meet WCAG 2.1 AA. Test with keyboard and screen reader.
3. **Progressive enhancement** — core content must work without JavaScript.
4. **Performance budget** — keep initial JS bundle under 150 KB. No unnecessary dependencies.
5. **Type safety** — strict TypeScript everywhere. No `any`. No `@ts-ignore`.

---

## 2. Next.js 16 Conventions

1. **App Router only** — no Pages Router.
2. **Server Components by default** — only add `'use client'` when you need interactivity (event handlers, hooks, browser APIs).
3. **Params is always a Promise** — `params: Promise<{ slug: string }>` and `await params`.
4. **searchParams is always a Promise** — `searchParams: Promise<{...}>` and `await searchParams`.
5. **Data fetching** — use `async` Server Components. No `useEffect` for initial data.
6. **Forms** — use React Server Actions (not API routes) for form handling.
7. **Loading states** — use `loading.tsx` files at each route segment level.
8. **Error states** — use `error.tsx` files with the `'use client'` directive for error boundaries.
9. **404 pages** — use `not-found.tsx` files.
10. **Metadata** — export `metadata` or `generateMetadata` from page/layout files. Do not use `<Head>`.
11. **Links** — use `<Link>` from `next/link`. Do not use `<a>` for internal navigation.
12. **Images** — use `next/image` for all images. Specify `width`, `height`, and `alt`.
13. **Fonts** — use `next/font` (Geist default). Custom fonts via `next/font/google`.
14. **CSS** — use Tailwind utility classes. CSS variables for theme tokens.
15. **Route groups** — use `(group)` to organize routes without affecting URLs.
16. **Private folders** — use `_folder` for non-routable internal files.
17. **No `next build` linting** — run `eslint` separately. `next build` no longer runs lint.

---

## 3. TypeScript Rules

1. Prefer `interface` over `type` for objects.
2. Use `type` for unions, intersections, and utility types.
3. All exports must be explicit (no `export default` for utilities, prefer named exports).
4. Define shared types in `src/types/`.
5. Component props must be typed and named `{ComponentName}Props`.

---

## 4. Component Patterns

1. Each component in its own file, named after the component.
2. Use `function ComponentName()` syntax (not arrow functions for component declarations).
3. Props interface defined above the component in the same file.
4. Keep components small — extract sub-components when a file exceeds 150 lines.
5. Use composition over prop drilling.
6. Client components should be as leaf-level as possible.

---

## 5. File & Folder Naming

| Item | Convention | Example |
|------|-----------|---------|
| Component files | PascalCase | `ChefCard.tsx` |
| Utility files | camelCase | `formatCurrency.ts` |
| Data files | camelCase | `chefs.ts` |
| Route files | Next.js conventions | `page.tsx`, `layout.tsx` |
| Folders | kebab-case | `chef-dashboard/` |

---

## 6. Git Workflow

1. Branch from `main`: `feature/description`, `fix/description`, `docs/description`.
2. Commit messages: imperative mood, no trailing period, max 72 chars title.
3. Squash commits before merging to main.
4. No commits directly to `main`.

---

## 7. Coding Standards

1. No unused imports or variables (enforced by ESLint).
2. No `console.log` in committed code.
3. No hardcoded strings — use constants or i18n.
4. No `// @ts-ignore` or `// @ts-expect-error`.
5. All functions must have return types.
6. Prefer `const` over `let`. Never use `var`.

---

## 8. Accessibility

1. All images must have meaningful `alt` text.
2. All form inputs must have associated `<label>`.
3. Use semantic HTML (`<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`).
4. Interactive elements must be keyboard accessible.
5. Color contrast must meet WCAG AA (4.5:1 for text, 3:1 for large text).
6. Use `aria-label`, `aria-labelledby` where semantic HTML is insufficient.

---

## 9. Performance

1. Lazy load below-the-fold images with `loading="lazy"`.
2. Use React.lazy for heavy client components only when needed.
3. Minimize client-side JavaScript — prefer Server Components.
4. Use CSS containment for isolated UI sections.
5. Avoid layout shifts — set explicit dimensions on images and embeds.

---

## 10. Security

1. Never trust user input — sanitize all form data on the server.
2. No sensitive data in client components (API keys, secrets).
3. Use environment variables (`.env.local`) for secrets.
4. All authentication routes must be on the server.
5. Validate and sanitize `searchParams` before use.

---

## 11. Review Checklist

Before merging any PR:
- [ ] TypeScript compiles with `tsc --noEmit` (no errors)
- [ ] ESLint passes with no warnings
- [ ] No `console.log` or debug code
- [ ] Accessibility tested (keyboard nav, screen reader)
- [ ] Mobile responsive tested (320px, 768px, 1024px, 1440px)
- [ ] Loading and error states handled
- [ ] No unused imports or variables
- [ ] Metadata set for SEO
