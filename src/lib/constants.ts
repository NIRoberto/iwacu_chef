export const SITE_NAME = "Iwacu Chef"
export const SITE_TAGLINE = "Homemade, from our home to yours"
export const SITE_DESCRIPTION = "Connect with local home chefs in Rwanda. Discover, order, and enjoy homemade meals from chefs near you."
export const SITE_URL = "https://iwacuchef.rw"

export const NAV_LINKS = [
  { href: "/", label: "Browse Chefs" },
  { href: "/chef-plans", label: "Chef Plans" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
] as const

export const CUISINE_COLORS: Record<string, string> = {
  Rwandan: "bg-brand-primary-light text-brand-primary",
  Traditional: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
  "Home-style": "bg-brand-primary-light text-brand-primary",
  Fusion: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
  French: "bg-brand-primary-light text-brand-primary",
  African: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
  Continental: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
  "East African": "bg-brand-primary-light text-brand-primary",
  Swahili: "bg-brand-primary-light text-brand-primary",
  Kenyan: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
  Tanzanian: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
  Healthy: "bg-brand-secondary/10 text-brand-secondary",
  Salads: "bg-brand-secondary/10 text-brand-secondary",
  Grill: "bg-brand-primary-light text-brand-primary",
  International: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
  Italian: "bg-brand-primary-light text-brand-primary",
  Pizza: "bg-brand-primary-light text-brand-primary",
  Pasta: "bg-brand-primary-light text-brand-primary",
  Mediterranean: "bg-brand-primary-light text-brand-primary",
  "High-protein": "bg-brand-secondary/10 text-brand-secondary",
  Fitness: "bg-brand-secondary/10 text-brand-secondary",
}
