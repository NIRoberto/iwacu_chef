import type { Metadata } from "next"
import Link from "next/link"
import { chefs } from "@/lib/data/chefs"
import { SearchBar } from "@/components/layout/SearchBar"
import { ChefCard } from "@/components/chefs/ChefCard"

export const metadata: Metadata = {
  title: "Browse Chefs",
  description: "Discover local home chefs in Rwanda. Browse profiles, menus, and reviews.",
}

export default async function ChefsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cuisine?: string }>
}) {
  const { q, cuisine } = await searchParams

  let filtered = chefs

  if (q) {
    const query = q.toLowerCase()
    filtered = filtered.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.title.toLowerCase().includes(query) ||
        c.cuisineType.some((t) => t.toLowerCase().includes(query)) ||
        c.location.toLowerCase().includes(query)
    )
  }

  if (cuisine) {
    filtered = filtered.filter((c) =>
      c.cuisineType.some((t) => t.toLowerCase() === cuisine.toLowerCase())
    )
  }

  const allCuisines = [...new Set(chefs.flatMap((c) => c.cuisineType))].sort()

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900">Browse chefs</h1>
          <p className="mt-1 text-neutral-500">
            {filtered.length} {filtered.length === 1 ? "chef" : "chefs"} near you
          </p>
        </div>
        <SearchBar className="w-full sm:w-72" />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <Link
          href="/chefs"
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            !cuisine && !q ? "bg-brand-primary text-white" : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
          }`}
        >
          All
        </Link>
        {allCuisines.map((c) => (
          <Link
            key={c}
            href={`/chefs?cuisine=${encodeURIComponent(c)}`}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              cuisine === c ? "bg-brand-primary text-white" : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
            }`}
          >
            {c}
          </Link>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-neutral-400 text-lg">No chefs found matching your search.</p>
          <Link href="/chefs" className="mt-4 inline-flex text-brand-primary text-sm font-medium hover:text-brand-primary-hover">
            Clear filters &rarr;
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((chef) => (
            <ChefCard key={chef.id} chef={chef} />
          ))}
        </div>
      )}
    </div>
  )
}
