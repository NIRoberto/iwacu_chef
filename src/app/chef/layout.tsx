import type { ReactNode } from "react"
import Link from "next/link"
import { ChefHat, LayoutDashboard, UtensilsCrossed, Package, CalendarCheck, Calendar } from "lucide-react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

const navItems = [
  { href: "/chef/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/chef/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/chef/plans", label: "Weekly Plans", icon: Calendar },
  { href: "/chef/orders", label: "Orders", icon: Package },
  { href: "/chef/bookings", label: "Bookings", icon: CalendarCheck },
]

export default function ChefLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex-1 flex flex-col lg:flex-row">
        <aside className="lg:w-56 shrink-0 border-b lg:border-b-0 lg:border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
          <nav className="flex lg:flex-col gap-1 p-3 overflow-x-auto" aria-label="Chef navigation">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors whitespace-nowrap shrink-0"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </aside>
        <main className="flex-1 p-6 sm:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
      <Footer />
    </>
  )
}
