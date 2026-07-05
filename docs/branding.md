# Brand Identity — Iwacu Chef

> **Version:** 0.1.0  
> **Status:** Draft  
> **Last Updated:** 2026-07-05

---

## 1. Brand Story

**Iwacu** (pronounced *ee-WAH-tsoo*) is a Kinyarwanda word meaning **"our home"** or **"our place."**

Iwacu Chef brings the warmth and authenticity of home cooking to your table. Just as a home kitchen is where the best meals are made with love, Iwacu Chef connects you with local home chefs who pour their heart into every dish.

The brand embodies:
- **Authenticity** — real people, real home kitchens, real food
- **Community** — supporting local chefs and neighbours
- **Trust** — transparent profiles, honest reviews
- **Warmth** — the feeling of a home-cooked meal

---

## 2. Brand Name

| Element | Value |
|---------|-------|
| Full name | Iwacu Chef |
| Short form | Iwacu |
| Tagline | *Homemade, from our home to yours* |
| Pronunciation | ee-WAH-tsoo |
| Origin | Kinyarwanda |

### Usage Rules
- Always capitalise: **Iwacu Chef** ✅ — *iwacu chef* ❌ — *IWACU CHEF* ❌
- On second reference, "Iwacu" is acceptable
- Do not abbreviate to "IC"

---

## 3. Logo

*To be designed. Placeholder guidance:*

| Format | Usage |
|--------|-------|
| Full logo (wordmark + icon) | Header, landing page, print |
| Icon only (mark) | Favicon, app icon, social avatar |
| Wordmark only | Small spaces, mobile |

### Logo Clear Space
Minimum clear space = height of the "I" in Iwacu on all sides.

---

## 4. Colour Palette

### Primary — Warm & Earthy

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-brand-primary` | `#C75B2A` | Buttons, links, accents |
| `--color-brand-primary-hover` | `#A84920` | Hover states |
| `--color-brand-primary-light` | `#F5E6D3` | Subtle backgrounds |

### Secondary — Fresh & Clean

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-brand-secondary` | `#2D6A4F` | Success, secondary buttons, highlights |
| `--color-brand-secondary-hover` | `#1B4332` | Hover states |

### Neutral

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-neutral-50` | `#FAFAF8` | Page backgrounds |
| `--color-neutral-100` | `#F0EDE8` | Card backgrounds |
| `--color-neutral-300` | `#C9C3B9` | Borders |
| `--color-neutral-500` | `#8A7F72` | Secondary text |
| `--color-neutral-700` | `#4A443D` | Body text |
| `--color-neutral-900` | `#1A1614` | Headings |

### Accent

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-accent-error` | `#C24038` | Errors, declines |

### Accessibility
All text/background combinations must meet WCAG AA (4.5:1 contrast ratio).

---

## 5. Typography

| Role | Font | Fallback |
|------|------|----------|
| Headings | Geist (sans-serif) | system-ui, sans-serif |
| Body | Geist (sans-serif) | system-ui, sans-serif |
| Monospace | Geist Mono | monospace |

### Scale

| Token | Size | Weight | Line Height |
|-------|------|--------|-------------|
| `h1` | 2.5rem (40px) | 700 | 1.1 |
| `h2` | 2.0rem (32px) | 600 | 1.2 |
| `h3` | 1.5rem (24px) | 600 | 1.3 |
| `h4` | 1.25rem (20px) | 600 | 1.4 |
| `body` | 1rem (16px) | 400 | 1.6 |
| `small` | 0.875rem (14px) | 400 | 1.5 |

### Usage
- No body text below 14px for readability
- Line length: 60–75 characters per line
- Use sentence case for headings (not Title Case)

---

## 6. Voice & Tone

### Voice Principles
| Principle | Description |
|-----------|-------------|
| **Warm** | Friendly and welcoming, like a home kitchen |
| **Clear** | Simple language, no jargon |
| **Honest** | Straightforward about pricing, portions, policies |
| **Local** | Embrace Rwandan culture and context |

### Tone Matrix

| Context | Tone | Example |
|---------|------|---------|
| Onboarding | Encouraging | "Welcome to Iwacu — let's get cooking!" |
| Order confirmation | Reassuring | "Your order is in. Chef X will start preparing." |
| Error / problem | Empathetic | "Something went wrong. Let's sort it out." |
| Review request | Inviting | "How was your meal? Your feedback helps the chef grow." |
| Chef registration | Celebratory | "Ready to share your cooking with the neighbourhood?" |

### Words to Use / Avoid

| ✅ Use | ❌ Avoid |
|--------|----------|
| meal, dish, plate | food item, SKU |
| chef, cook | vendor, seller |
| customer, diner | user, consumer |
| order | transaction |
| home kitchen | facility, premise |

---

## 7. Imagery

| Type | Style |
|------|-------|
| Food photos | Natural lighting, warm tones, shallow depth of field |
| Chef portraits | Casual, in their home kitchen, smiling |
| Platform screenshots | Clean, focus on the food and people |
| Illustrations | Warm line-art style, earth tones, cultural motifs |

### Photography Guidelines
- No stock photography of food (real chef photos only)
- Consistent warm filter (Adobe Lightroom preset: Temp +5, Tint -3, Contrast +10)
- Aspect ratio: square (1:1) for menu items, 4:3 for profile covers

---

## 8. Spacing & Layout

| Token | Size |
|-------|------|
| `--space-xs` | 4px |
| `--space-sm` | 8px |
| `--space-md` | 16px |
| `--space-lg` | 24px |
| `--space-xl` | 32px |
| `--space-2xl` | 48px |
| `--space-3xl` | 64px |

### Grid
- 4-column grid on mobile
- 8-column grid on tablet
- 12-column grid on desktop
- Max content width: 1200px

---

## 9. Application in Code

Brand tokens are defined in `src/app/globals.css` using CSS custom properties:

```css
@theme inline {
  --color-brand-primary: #C75B2A;
  --color-brand-primary-hover: #A84920;
  --color-brand-primary-light: #F5E6D3;
  --color-brand-secondary: #2D6A4F;
  --color-brand-secondary-hover: #1B4332;
  --color-accent-error: #C24038;
}
```

Usage in components:
```tsx
<button className="bg-brand-primary text-white">Order Now</button>
```
