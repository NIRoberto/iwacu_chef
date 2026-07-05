"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, UtensilsCrossed, Package, CalendarCheck } from "lucide-react"

const links = [
  { href: "/chef/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/chef/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/chef/orders", label: "Orders", icon: Package },
  { href: "/chef/bookings", label: "Bookings", icon: CalendarCheck },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-60 shrink-0 border-r border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-950 hidden lg:block">
      <nav className="p-4 space-y-1" aria-label="Chef dashboard navigation">
        {links.map((link) => {
          const active = pathname === link.href
          const Icon = link.icon
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                active
                  ? "bg-brand-primary-light text-brand-primary dark:bg-brand-primary/20"
                  : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-700 dark:hover:text-neutral-300"
              }`}
            >
              <Icon className={`w-4 h-4 ${active ? "text-brand-primary" : ""}`} />
              {link.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
