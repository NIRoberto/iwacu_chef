import Link from "next/link"
import { chefs } from "@/lib/data/chefs"
import { menuItems } from "@/lib/data/menus"
import { reviews } from "@/lib/data/reviews"
import { ChefProfile } from "@/components/chefs/ChefProfile"
import { MenuList } from "@/components/menu/MenuList"
import { ReviewSection } from "@/components/chefs/ReviewSection"
import { ChefCard } from "@/components/chefs/ChefCard"

export default async function HomePage() {
  const featured = chefs.find((c) => c.featured) ?? chefs[0]
  const others = chefs.filter((c) => c.id !== featured.id)
  const chefMenu = menuItems.filter((m) => m.chefId === featured.id)
  const chefReviews = reviews.filter((r) => r.chefId === featured.id)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${featured.coverImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
          <div className="flex flex-col sm:flex-row sm:items-end gap-6">
            <div
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-cover bg-center shrink-0 border-4 border-white/20 shadow-lg"
              style={{ backgroundImage: `url(${featured.photo})` }}
            />
            <div className="text-white">
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">{featured.name}</h1>
              <p className="text-lg sm:text-xl text-white/80 mt-2 max-w-2xl">{featured.title}</p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-4 text-sm text-white/70">
                <span>📍 {featured.location}</span>
                <span>⭐ {featured.rating} ({featured.reviewCount} reviews)</span>
                <span>🕐 {featured.operatingHours}</span>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/chefs/${featured.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white hover:bg-brand-primary-hover transition-colors shadow-lg"
                >
                  View full menu
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href={`/chefs/${featured.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-6 py-3 text-sm font-medium text-white hover:bg-white/25 transition-colors border border-white/20"
                >
                  See reviews
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-neutral-50 dark:bg-neutral-900 border-y border-neutral-100 dark:border-neutral-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { label: "Menu items", value: chefMenu.length },
              { label: "Reviews", value: chefReviews.length },
              { label: "Meals cooked", value: "1,200+" },
              { label: "Years cooking", value: "8+" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl sm:text-3xl font-bold text-brand-primary">{s.value}</p>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            About {featured.name}
          </h2>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400 leading-relaxed whitespace-pre-line">
            {featured.story}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {featured.cuisineType.map((c) => (
              <span
                key={c}
                className="rounded-full bg-brand-primary-light dark:bg-brand-primary/20 px-3 py-1 text-xs font-medium text-brand-primary"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Menu */}
      <section className="bg-neutral-50 dark:bg-neutral-900 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                Menu
              </h2>
              <p className="mt-1 text-neutral-500 dark:text-neutral-400">
                {chefMenu.length} items across {new Set(chefMenu.map((i) => i.category)).size} categories
              </p>
            </div>
            <Link
              href={`/chefs/${featured.slug}`}
              className="hidden sm:inline-flex text-sm font-medium text-brand-primary hover:text-brand-primary-hover transition-colors"
            >
              View full menu &rarr;
            </Link>
          </div>
          <MenuList items={chefMenu} />
          <div className="mt-8 text-center sm:hidden">
            <Link
              href={`/chefs/${featured.slug}`}
              className="inline-flex text-sm font-medium text-brand-primary hover:text-brand-primary-hover transition-colors"
            >
              View full menu &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
              What customers say
            </h2>
            <p className="mt-1 text-neutral-500 dark:text-neutral-400">
              {featured.rating} stars from {chefReviews.length} reviews
            </p>
          </div>
        </div>
        <ReviewSection reviews={chefReviews} />
      </section>

      {/* Other chefs */}
      <section className="bg-neutral-50 dark:bg-neutral-900 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                More chefs near you
              </h2>
              <p className="mt-1 text-neutral-500 dark:text-neutral-400">
                {others.length} other home chefs in Kigali
              </p>
            </div>
            <Link
              href="/"
              className="hidden sm:inline-flex text-sm font-medium text-brand-primary hover:text-brand-primary-hover transition-colors"
            >
              Browse all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {others.map((chef) => (
              <ChefCard key={chef.id} chef={chef} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
