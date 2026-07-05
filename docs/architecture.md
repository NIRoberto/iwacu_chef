# Architecture — Iwacu Chef

> **Version:** 0.1.0  
> **Status:** Draft  
> **Last Updated:** 2026-07-05

---

## 1. Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5.x |
| Styling | Tailwind CSS 4 |
| Linting | ESLint 9 |
| Package Manager | npm |
| Bundler | Turbopack (default) |

---

## 2. Directory Structure

```
iwacu-chef/
├── docs/                       # Planning & documentation
│   ├── srs.md
│   ├── architecture.md
│   ├── rules.md
│   └── branding.md
├── public/                     # Static assets
│   ├── images/
│   │   ├── brand/             # Logo, favicon, OG images
│   │   ├── chefs/             # Chef profile photos
│   │   └── meals/             # Meal photos
│   └── fonts/                 # Custom fonts (if any)
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (marketing)/       # Route group — public pages
│   │   │   ├── page.tsx       # Landing /
│   │   │   ├── about/page.tsx
│   │   │   └── layout.tsx     # Marketing layout
│   │   ├── (chef)/            # Route group — chef dashboard
│   │   │   ├── dashboard/
│   │   │   ├── menu/
│   │   │   └── orders/
│   │   ├── (customer)/        # Route group — customer features
│   │   │   ├── chefs/
│   │   │   │   ├── [slug]/page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── cart/page.tsx
│   │   │   └── orders/
│   │   ├── auth/              # Auth routes (login, register)
│   │   ├── layout.tsx         # Root layout
│   │   ├── globals.css        # Global styles
│   │   ├── loading.tsx        # Root loading skeleton
│   │   ├── error.tsx          # Root error boundary
│   │   └── not-found.tsx      # 404 page
│   ├── components/            # Shared UI components
│   │   ├── ui/                # Primitive UI (Button, Card, Input…)
│   │   ├── layout/            # Header, Footer, Sidebar, Nav
│   │   ├── chefs/             # Chef-specific components
│   │   ├── menu/              # Menu-specific components
│   │   └── orders/            # Order-specific components
│   ├── lib/                   # Utilities, helpers, constants
│   │   ├── data/              # Static data / mock data
│   │   ├── utils.ts
│   │   └── constants.ts
│   ├── hooks/                 # Custom React hooks
│   └── types/                 # Shared TypeScript types
├── next.config.ts
├── tailwind.config.ts         # Tailwind v4 config (if needed)
├── tsconfig.json
├── eslint.config.mjs
├── AGENTS.md                  # AI coding agent guidelines
└── package.json
```

---

## 3. Route Design

| Route | Page | Layout | Auth |
|-------|------|--------|------|
| `/` | Landing | Marketing | — |
| `/about` | About | Marketing | — |
| `/chefs` | Chef listing | Customer | — |
| `/chefs/[slug]` | Chef detail + menu | Customer | — |
| `/cart` | Shopping cart | Customer | Required |
| `/auth/login` | Login | Auth | — |
| `/auth/register` | Register | Auth | — |
| `/chef/dashboard` | Chef overview | Chef | Chef |
| `/chef/menu` | Menu manager | Chef | Chef |
| `/chef/orders` | Order manager | Chef | Chef |
| `/customer/orders` | My orders | Customer | Customer |

---

## 4. Component Architecture

```
RootLayout
├── MarketingLayout
│   ├── LandingPage
│   ├── AboutPage
│   └── ChefListingPage
├── CustomerLayout
│   ├── ChefDetailPage
│   │   ├── ChefProfileCard
│   │   ├── MenuList
│   │   │   └── MenuItemCard
│   │   └── ReviewSection
│   ├── CartPage
│   └── OrdersPage
├── ChefLayout
│   ├── DashboardPage
│   ├── MenuManager
│   └── OrderManager
└── AuthLayout
    ├── LoginPage
    └── RegisterPage
```

### 4.1 Shared Components (`src/components/ui/`)
- `Button`, `Input`, `Select`, `Textarea`
- `Card`, `Badge`, `Avatar`
- `Modal`, `Drawer`
- `Skeleton`, `Spinner`
- `Toast`, `Alert`

### 4.2 Layout Components (`src/components/layout/`)
- `Header` — logo, navigation, auth buttons
- `Footer` — links, social, copyright
- `Sidebar` — chef dashboard navigation
- `SearchBar` — search with autocomplete

---

## 5. Data Flow

### 5.1 MVP (Static/Mock Data)
For the initial phase, all data comes from static files in `src/lib/data/`:

- `chefs.ts` — array of chef objects
- `menus.ts` — array of menu items linked to chefs
- `reviews.ts` — array of reviews linked to chefs

Data flows: Static data → Server Component → Rendered HTML

### 5.2 Future (Database)
Future phases will introduce:
- Database: PostgreSQL (via Prisma or Drizzle)
- API Layer: Next.js Route Handlers (`src/app/api/`)
- Auth: NextAuth.js
- File uploads: Uploadthing or S3

---

## 6. Key Patterns

| Pattern | Implementation |
|---------|---------------|
| Data fetching | Server Components with `async` — no `useEffect` for initial data |
| Client interactivity | `'use client'` only where needed (forms, cart, interactive UI) |
| Styling | Tailwind utility classes; CSS variables for theme |
| Forms | React Server Actions for form handling |
| Loading states | `loading.tsx` per route segment |
| Error states | `error.tsx` per route segment with retry |
| 404 | `not-found.tsx` per route segment |

---

## 7. Performance Targets

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| TBT | < 200ms |
| CLS | < 0.1 |
| Lighthouse | ≥ 90 all categories |
| JS bundle | < 150 KB initial |

---

## 8. i18n Strategy

Use Next.js built-in `i18n` routing or `next-intl`:
- Default locale: English (`en`)
- Secondary locale: Kinyarwanda (`rw`)
- All user-facing strings in locale JSON files
- Chef content expected in both languages
