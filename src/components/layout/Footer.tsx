import Link from "next/link"
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300 mt-auto">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="text-xl font-bold text-white">
              🍳 {SITE_NAME}
            </Link>
            <p className="mt-2 text-sm text-neutral-400">{SITE_TAGLINE}</p>
            <p className="mt-1 text-sm text-neutral-400">Connecting you with local home chefs in Rwanda.</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Explore</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm hover:text-white transition-colors">Browse Chefs</Link></li>
              <li><Link href="/about" className="text-sm hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-3">For Chefs</h3>
            <ul className="space-y-2">
              <li><Link href="/auth/register" className="text-sm hover:text-white transition-colors">Become a Chef</Link></li>
              <li><Link href="/chef/dashboard" className="text-sm hover:text-white transition-colors">Chef Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Connect</h3>
            <ul className="space-y-2">
              <li><span className="text-sm text-neutral-400">Kigali, Rwanda</span></li>
              <li><span className="text-sm text-neutral-400">hello@iwacuchef.rw</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-neutral-800 text-center text-xs text-neutral-500">
          &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
