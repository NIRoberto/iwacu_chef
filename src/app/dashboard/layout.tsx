import type { ReactNode } from "react"
import Link from "next/link"
import { ChefHat, LayoutDashboard, UtensilsCrossed, Package, CalendarCheck, Calendar } from "lucide-react"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/chef/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/chef/plans", label: "Weekly Plans", icon: Calendar },
  { href: "/chef/orders", label: "Orders", icon: Package },
  { href: "/chef/bookings", label: "Bookings", icon: CalendarCheck },
]

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col">
      <header className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex h-14 items-center gap-2">
            <ChefHat className="w-5 h-5 text-brand-primary shrink-0" />
            <span className="text-sm font-bold text-neutral-900 dark:text-white">Iwacu Chef</span>
            <span className="text-xs text-neutral-300 dark:text-neutral-600 mx-2">|</span>
            <nav className="flex gap-1 overflow-x-auto">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors whitespace-nowrap shrink-0"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 sm:px-6 py-6 sm:py-8">
        {children}
      </main>
    </div>
  )
}
