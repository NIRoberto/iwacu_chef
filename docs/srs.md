# Software Requirements Specification — Iwacu Chef

> **Version:** 0.1.0  
> **Status:** Draft  
> **Last Updated:** 2026-07-05

---

## 1. Introduction

### 1.1 Purpose
Iwacu Chef is a web-based marketplace platform that connects local/home-based chefs with customers seeking homemade meals. The platform enables chefs to list their menus, manage orders, and build a customer base, while customers can discover, order, and review meals from nearby chefs.

### 1.2 Scope
The initial release (v0.1) covers the customer-facing marketplace and chef dashboard. Admin capabilities, payments (via M-Pesa or card), and real-time order tracking are planned for subsequent releases.

### 1.3 Definitions
| Term | Definition |
|------|-----------|
| Chef | A user who cooks and sells meals via the platform |
| Customer | A user who browses and orders meals |
| Order | A request for one or more menu items from a chef |
| Menu | A collection of meal items offered by a chef |
| Review | Rating and feedback left by a customer after an order |

---

## 2. User Roles

| Role | Description |
|------|-------------|
| **Visitor** | Unauthenticated user — can browse public chef profiles and menus |
| **Customer** | Registered user — can place orders, leave reviews, manage profile |
| **Chef** | Registered user with chef profile — can create/manage menus and orders |
| **Admin** | Platform administrator — manages users, content, platform settings |

---

## 3. Functional Requirements

### 3.1 Authentication & Authorization
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-01 | Users shall register via email/password or OAuth (Google, Apple) | P1 |
| FR-02 | Users shall log in and maintain sessions via JWT or NextAuth | P1 |
| FR-03 | Users shall reset passwords via email | P2 |
| FR-04 | Role-based access control shall restrict chef/admin areas | P1 |

### 3.2 Browsing & Discovery (Customer)
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-05 | Customers shall view a curated landing page with featured chefs | P1 |
| FR-06 | Customers shall browse chefs by location, cuisine type, or rating | P1 |
| FR-07 | Customers shall view a chef's profile, story, menu, and reviews | P1 |
| FR-08 | Customers shall search chefs and menu items by keyword | P1 |
| FR-09 | Customers shall filter by dietary preferences, price range, distance | P2 |

### 3.3 Chef Profiles
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-10 | Chefs shall create and edit their public profile (bio, photo, cover) | P1 |
| FR-11 | Chefs shall set service areas, operating hours, and cuisine types | P1 |
| FR-12 | Chefs shall upload a profile photo and optional cover image | P1 |

### 3.4 Menu Management (Chef)
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-13 | Chefs shall create, edit, delete, and reorder menu items | P1 |
| FR-14 | Each menu item shall have: name, description, price, photo, category | P1 |
| FR-15 | Chefs shall mark items as available/unavailable on given days | P2 |
| FR-16 | Chefs shall set weekly schedules for meal availability | P2 |

### 3.5 Ordering
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-17 | Customers shall add items to a cart and place an order | P1 |
| FR-18 | Customers shall specify pickup/delivery time windows | P2 |
| FR-19 | Chefs shall receive order notifications | P1 |
| FR-20 | Chefs shall accept or decline orders (with reason if declined) | P1 |
| FR-21 | Status flow: Pending → Confirmed → Preparing → Ready → Completed | P2 |

### 3.6 Reviews & Ratings
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-22 | Customers shall rate chefs (1–5 stars) after a completed order | P1 |
| FR-23 | Customers shall write text reviews | P1 |
| FR-24 | Chefs may reply to reviews | P2 |
| FR-25 | Average rating shall be displayed on chef profiles | P1 |

### 3.7 Chef Dashboard
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-26 | Chefs shall see order history, stats, and pending orders | P1 |
| FR-27 | Chefs shall view weekly/monthly performance summary | P2 |
| FR-28 | Chefs shall receive in-app and email notifications | P2 |

### 3.8 Admin Panel
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-29 | Admins shall approve/reject new chef registrations | P2 |
| FR-30 | Admins shall manage reported content and users | P2 |
| FR-31 | Admins shall view platform-wide analytics | P3 |

---

## 4. Non-Functional Requirements

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-01 | Performance — initial page load (LCP) under 2.5s | Lighthouse score ≥ 90 |
| NFR-02 | Mobile-first responsive design | All pages functional at 320px+ |
| NFR-03 | Accessibility — WCAG 2.1 AA compliant | Screen-reader compatible |
| NFR-04 | SEO — each chef and menu item indexed by search engines | Dynamic meta tags |
| NFR-05 | Security — no XSS, CSRF, SQL injection vectors | Input sanitization |
| NFR-06 | Offline resilience — graceful degradation when offline | Fallback UI |
| NFR-07 | i18n — platform support for English and Kinyarwanda | Locale switching |
| NFR-08 | Progressive Web App — installable on mobile devices | Service worker |

---

## 5. Constraints

- Built with Next.js 16 (App Router) + Tailwind CSS 4 + TypeScript
- No server-side database in MVP — data sourced from static content / CMS
- Must work without JavaScript enabled for content pages (progressive enhancement)
- Must adhere to the AGENTS.md coding guidelines for Next.js 16

---

## 6. Future Scope

- Payment integration (M-Pesa, credit card)
- Real-time order tracking (WebSockets)
- In-app messaging between chefs and customers
- Loyalty programs / referral system
- Multi-language support (English, Kinyarwanda, French)
- Mobile app (React Native or PWA)
