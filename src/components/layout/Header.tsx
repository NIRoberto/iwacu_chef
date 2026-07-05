"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { NAV_LINKS, SITE_NAME } from "@/lib/constants"
import { useCart } from "@/lib/cart-context"
import { ChefHat, Users, Calendar, Compass, Info } from "lucide-react"

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const { itemCount } = useCart()
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem("theme")
    if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setDark(true)
      document.documentElement.classList.add("dark")
    }
    const currentUser = localStorage.getItem("currentUser")
    if (currentUser) setUser(JSON.parse(currentUser))
  }, [])

  function toggleDark() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle("dark", next)
    localStorage.setItem("theme", next ? "dark" : "light")
  }

  function handleSignOut() {
    localStorage.removeItem("currentUser")
    setUser(null)
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-neutral-100 dark:bg-neutral-900/95 dark:border-neutral-800">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-neutral-900 dark:text-white">
            <ChefHat className="text-brand-primary w-7 h-7" />
            <span>{SITE_NAME}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const navIcons: Record<string, React.ReactNode> = {
                "/": <Users className="w-4 h-4" />,
                "/chef-plans": <Calendar className="w-4 h-4" />,
                "/how-it-works": <Compass className="w-4 h-4" />,
                "/about": <Info className="w-4 h-4" />,
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors"
                >
                  {navIcons[link.href]}
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/cart"
              className="relative p-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors"
              aria-label={`Cart (${itemCount} items)`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-primary text-white text-[10px] font-bold flex items-center justify-center">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={toggleDark}
              className="p-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors"
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {dark ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              )}
            </button>
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/my-orders"
                  className="text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors"
                >
                  My orders
                </Link>
                <span className="text-sm text-neutral-500 dark:text-neutral-400">{user.name}</span>
                <button
                  onClick={handleSignOut}
                  className="text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-accent-error transition-colors"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-brand-primary dark:hover:text-brand-primary transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/register"
                  className="rounded-full bg-brand-primary px-5 py-2 text-sm font-medium text-white hover:bg-brand-primary-hover transition-colors"
                >
                  Get started
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/cart"
              className="relative p-2 text-neutral-500 dark:text-neutral-400"
              aria-label={`Cart (${itemCount} items)`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-primary text-white text-[10px] font-bold flex items-center justify-center">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={toggleDark}
              className="p-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors"
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {dark ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              )}
            </button>
            <button
              className="p-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-white"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="md:hidden pb-4 border-t border-neutral-100 dark:border-neutral-800 pt-4" aria-label="Mobile navigation">
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors py-2"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/cart"
                className="text-sm font-medium text-neutral-500 dark:text-neutral-400 py-2"
                onClick={() => setMenuOpen(false)}
              >
                Cart ({itemCount})
              </Link>
              <hr className="border-neutral-100 dark:border-neutral-800 my-2" />
              {user ? (
                <>
                  <span className="text-sm text-neutral-500 dark:text-neutral-400 py-2">{user.name}</span>
                  <Link
                    href="/my-orders"
                    className="text-sm font-medium text-neutral-500 dark:text-neutral-400 py-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    My orders
                  </Link>
                  <button
                    onClick={() => { handleSignOut(); setMenuOpen(false) }}
                    className="text-sm font-medium text-neutral-500 dark:text-neutral-400 text-left py-2"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="text-sm font-medium text-neutral-700 dark:text-neutral-300 py-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/auth/register"
                    className="text-sm font-medium text-white bg-brand-primary rounded-full px-5 py-2.5 text-center"
                    onClick={() => setMenuOpen(false)}
                  >
                    Get started
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
