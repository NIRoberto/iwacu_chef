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

## Goal
- Replace home page with chefs listing (straight to content), add light/dark mode toggle.

## Constraints & Preferences
- No separate landing/marketing page; `/` must show the chefs browse page directly
- Must support user-toggleable light and dark colour modes (not just OS preference)
- Must use real images (Unsplash photos already downloaded)
- Must follow Next.js 16 conventions (App Router, async params, Server Components by default)
- Must use brand colours: `brand-primary: #C75B2A`, `brand-secondary: #2D6A4F`, etc.
- All internal navigation must use `<Link>` not `<a>`

## Progress
### Done
- Created project docs: SRS, architecture, rules, branding
- Defined shared TypeScript types (`Chef`, `MenuItem`, `Review`, `Order`, `CartItem`)
- Created mock data (6 chefs, 22 menu items, 12 reviews, 3 orders)
- Built shared UI components: `Button`, `Card`, `Badge`, `Avatar`, `Input`, `Select`, `Modal`, `Toast`, `Skeleton`, `StarRating`
- Built layout components: `Header` (responsive + mobile menu, dark mode toggle), `Footer`, `Sidebar` (chef nav), `SearchBar`
- Built pages: about, chefs listing (home), chef detail, auth (login/register), chef dashboard, menu manager, order manager, cart, my orders
- Added root `loading.tsx`, `error.tsx`, `not-found.tsx`
- Resolved route conflict between `(chef)/orders` and `(customer)/orders` → moved chef pages to `/chef/`, customer orders to `/my-orders`
- Downloaded real Unsplash images for all chefs, meals, and customers into `public/images/`
- Added custom favicon (`public/favicon.svg`)
- Replaced marketing landing page with chefs listing as home page (`/`)
- Removed `(customer)` route group (merged into `(marketing)`); no more separate `/chefs` route
- Implemented dark mode toggle in Header (sun/moon icons) with `localStorage` persistence and CSS variables
- Full dark mode support via `globals.css` CSS variables + Tailwind `dark:` variants on all components
- Built cart context (`src/lib/cart-context.tsx`) with React Context for global cart state (add, remove, update quantity, clear)
- Wired `MenuItemCard` "Add" button to cart context (adds item, shows "Added ✓" feedback)
- Wired `CartContent` to read from cart context with +/-/remove controls and "Place order" button
- "Place order" creates order in localStorage, clears cart, redirects to `/my-orders`
- `MyOrdersPage` reads from localStorage instead of static mock data
- Auth forms (login/register) store/validate users via localStorage; login redirects to home
- Header shows cart icon with live item count badge, user name when logged in, sign out button
- Dark mode applied to all remaining components (`ChefProfile`, `ReviewSection`, `MenuItemCard`, `CartContent`, `MyOrdersPage`)
- Fixed all leftover `/chefs` links to `/`
- Expanded chef-1 (Mama Keziah) menu from 4 to 27 items across 11 categories (Breakfast, Appetizers, Soups & Stews, Mains, Grills, Sides, Drinks, Desserts)
- Added 5 more reviews for chef-1 (now 8 total)
- Redesigned home page as rich single-chef profile: hero with cover image overlay, stats bar, about section, full categorized menu grid, reviews, and "more chefs" section at bottom
- Build passes TypeScript; all pushed to `https://github.com/NIRoberto/iwacu_chef.git`

### Blocked
- (none)

## Key Decisions
- Dark mode uses Tailwind `dark:` variants + CSS custom properties on `:root` / `.dark`, toggled via a client component with `localStorage` persistence
- No `(customer)` route group — all customer routes live in `(marketing)` or at the root level; `(chef)` and `(auth)` route groups stay separate
- Images downloaded locally instead of hotlinking — avoids CORS issues with `next/image`

## Critical Context
- Build warning about turbopack root: fixed by adding `turbopack: { root: __dirname }` in `next.config.ts`
- TypeScript strict mode caught missing `useRef` initial value in `Toast.tsx` — fixed
- ESLint caught `<a>` instead of `<Link>` and `<img>` instead of `next/image` across multiple files — all fixed
- Route structure: `(marketing)/page.tsx` = home (chefs listing), `(marketing)/chefs/[slug]/` = chef detail, `(marketing)/cart/` = cart, `(marketing)/about/` = about. Auth at `auth/`, chef at `chef/`, customer orders at `my-orders/`.

## Relevant Files
- `src/app/(marketing)/page.tsx`: home page — chefs listing with search/filter/cuisine pills, no hero/marketing content
- `src/app/globals.css`: `:root` for light, `.dark` for dark — all brand + neutral colours as CSS variables
- `src/components/layout/Header.tsx`: dark mode toggle button with sun/moon SVG icons, desktop + mobile
- `src/components/chefs/ChefCard.tsx`: dark mode classes on card, heading, body text
- `src/components/layout/SearchBar.tsx`: dark mode input styles, search pushes to `/?q=`
- `src/lib/constants.ts`: NAV_LINKS updated — "Browse Chefs" is the only primary link (href `/`)
- `src/components/layout/Footer.tsx`: "Browse Chefs" links to `/` not `/chefs`
