import type { ReactNode } from "react"
import Link from "next/link"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { LayoutDashboard, UtensilsCrossed, Package, CalendarCheck } from "lucide-react"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/chef/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/chef/orders", label: "Orders", icon: Package },
  { href: "/chef/bookings", label: "Bookings", icon: CalendarCheck },
]

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <nav className="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex gap-1 py-3 overflow-x-auto">
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
          </div>
        </div>
      </nav>
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 sm:px-6 py-6 sm:py-8">
        {children}
      </main>
      <Footer />
    </>
  )
}
