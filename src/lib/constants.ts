export const SITE_NAME = "Iwacu Chef"
export const SITE_TAGLINE = "Homemade, from our home to yours"
export const SITE_DESCRIPTION = "Connect with local home chefs in Rwanda. Discover, order, and enjoy homemade meals from chefs near you."
export const SITE_URL = "https://iwacuchef.rw"

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/chefs", label: "Browse Chefs" },
  { href: "/about", label: "About" },
] as const

export const CUISINE_COLORS: Record<string, string> = {
  Rwandan: "bg-brand-primary-light text-brand-primary",
  Traditional: "bg-amber-50 text-amber-700",
  "Home-style": "bg-orange-50 text-orange-700",
  Fusion: "bg-purple-50 text-purple-700",
  French: "bg-blue-50 text-blue-700",
  African: "bg-amber-50 text-amber-800",
  Continental: "bg-teal-50 text-teal-700",
  "East African": "bg-green-50 text-green-700",
  Swahili: "bg-cyan-50 text-cyan-700",
  Kenyan: "bg-emerald-50 text-emerald-700",
  Tanzanian: "bg-lime-50 text-lime-700",
  Healthy: "bg-green-50 text-green-800",
  Salads: "bg-lime-50 text-lime-800",
  Grill: "bg-red-50 text-red-700",
  International: "bg-sky-50 text-sky-700",
  Italian: "bg-rose-50 text-rose-700",
  Pizza: "bg-yellow-50 text-yellow-700",
  Pasta: "bg-orange-50 text-orange-800",
  Mediterranean: "bg-indigo-50 text-indigo-700",
  "High-protein": "bg-red-50 text-red-800",
  Fitness: "bg-emerald-50 text-emerald-800",
}
