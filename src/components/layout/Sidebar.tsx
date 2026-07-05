"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { href: "/chef/dashboard", label: "Overview", icon: "📊" },
  { href: "/chef/menu", label: "Menu", icon: "📋" },
  { href: "/chef/orders", label: "Orders", icon: "📦" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-60 shrink-0 border-r border-neutral-100 bg-white hidden lg:block">
      <nav className="p-4 space-y-1" aria-label="Chef dashboard navigation">
        {links.map((link) => {
          const active = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                active
                  ? "bg-brand-primary-light text-brand-primary"
                  : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700"
              }`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
