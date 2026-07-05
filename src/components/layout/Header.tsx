"use client"

import Link from "next/link"
import { useState } from "react"
import { NAV_LINKS, SITE_NAME } from "@/lib/constants"

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-neutral-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-neutral-900">
            <span className="text-brand-primary text-2xl">🍳</span>
            <span>{SITE_NAME}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-neutral-500 hover:text-brand-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/auth/login"
              className="text-sm font-medium text-neutral-700 hover:text-brand-primary transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/auth/register"
              className="rounded-full bg-brand-primary px-5 py-2 text-sm font-medium text-white hover:bg-brand-primary-hover transition-colors"
            >
              Get started
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-neutral-500 hover:text-neutral-700"
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

        {menuOpen && (
          <nav className="md:hidden pb-4 border-t border-neutral-100 pt-4" aria-label="Mobile navigation">
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-neutral-500 hover:text-brand-primary transition-colors py-2"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <hr className="border-neutral-100 my-2" />
              <Link
                href="/auth/login"
                className="text-sm font-medium text-neutral-700 py-2"
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
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
